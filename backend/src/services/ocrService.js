import sharp from 'sharp';
import jsQR from 'jsqr';
import { createWorker } from 'tesseract.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const trainedDataPath = path.resolve(__dirname, '../../eng.traineddata');

export const validatePaymentScreenshot = async (imageBuffer) => {
  let isQrDetected = false;
  let qrData = null;

  // 1. Scan image for QR codes using sharp + jsQR
  try {
    const { data, info } = await sharp(imageBuffer)
      .raw()
      .ensureAlpha()
      .toBuffer({ resolveWithObject: true });

    const qrResult = jsQR(new Uint8ClampedArray(data), info.width, info.height);
    if (qrResult && qrResult.data) {
      isQrDetected = true;
      qrData = qrResult.data;
      if (qrData.toLowerCase().includes('upi://pay') || qrData.toLowerCase().includes('upi://')) {
        return {
          valid: false,
          error: 'તમે પેમેન્ટનો QR કોડ અપલોડ કર્યો છે. કૃપા કરીને પેમેન્ટ થયા પછીનો સક્સેસ સ્ક્રીનશોટ (Receipt) અપલોડ કરો!'
        };
      }
    }
  } catch (qrErr) {
    console.warn('[OCR Service] jsQR inspection warning:', qrErr.message);
  }

  // 2. OCR text recognition using Tesseract.js
  let ocrText = '';
  let payeeName = 'Not detected';
  let utr = '';

  try {
    // Resize / preprocess for faster and sharper OCR
    const processedBuffer = await sharp(imageBuffer)
      .resize({ width: 1400, withoutEnlargement: true })
      .grayscale()
      .toBuffer();

    const worker = await createWorker('eng', 1, {
      langPath: path.resolve(__dirname, '../../')
    });
    const ret = await worker.recognize(processedBuffer);
    ocrText = ret.data.text || '';
    await worker.terminate();

    const textLower = ocrText.toLowerCase();

    // Verification keywords standard across GPay, PhonePe, Paytm, BHIM, Bank transfers
    const receiptKeywords = [
      'success', 'successful', 'paid', 'payment', 'transferred', 'completed',
      'utr', 'txn', 'transaction', 'ref', 'gpay', 'phonepe', 'paytm', 'bhim',
      'sent', 'upi', 'to:', 'from:', 'rs', 'received', 'debit', 'credit', 'inr'
    ];

    const hasReceiptKeyword = receiptKeywords.some(keyword => textLower.includes(keyword));

    if (!hasReceiptKeyword) {
      return {
        valid: false,
        error: 'અપલોડ કરેલી ઈમેજ પેમેન્ટ રિસીપ્ટ કે કન્ફર્મેશન સ્ક્રીનશોટ નથી. કૃપા કરીને સાચો સક્સેસ સ્ક્રીનશોટ (Receipt) અપલોડ કરો!'
      };
    }

    // Extract Payee Name
    const payeePatterns = [
      /to\s*:\s*([A-Za-z0-9\s\.\-\&]+)/i,
      /paid\s+to\s+([A-Za-z0-9\s\.\-\&]+)/i,
      /transfer\s+to\s+([A-Za-z0-9\s\.\-\&]+)/i,
      /payment\s+to\s+([A-Za-z0-9\s\.\-\&]+)/i,
      /sent\s+to\s+([A-Za-z0-9\s\.\-\&]+)/i
    ];

    for (const pattern of payeePatterns) {
      const match = ocrText.match(pattern);
      if (match && match[1]) {
        const extracted = match[1].split('\n')[0].trim();
        if (extracted.length > 2 && !/^\d+$/.test(extracted)) {
          payeeName = extracted;
          break;
        }
      }
    }

    // Extract UTR / Transaction Reference
    const utrPatterns = [
      /utr\s*(?:no\.?|number|id)?\s*[:\-\s]?\s*([0-9]{12})/i,
      /upi\s*ref\s*(?:no\.?|number|id)?\s*[:\-\s]?\s*([0-9]{12})/i,
      /ref(?:erence)?\s*(?:no\.?|id)?\s*[:\-\s]?\s*([0-9]{12})/i,
      /txn\s*(?:id|no\.?)?\s*[:\-\s]?\s*([A-Za-z0-9]{10,25})/i,
      /\b(\d{12})\b/
    ];

    for (const pattern of utrPatterns) {
      const match = ocrText.match(pattern);
      if (match && match[1]) {
        utr = match[1].trim();
        break;
      }
    }

  } catch (ocrErr) {
    console.error('[OCR Service] Tesseract extraction error:', ocrErr.message);
    // If OCR fails internally due to system edge cases, allow admin manual review
  }

  return {
    valid: true,
    payeeName,
    utr,
    ocrSnippet: ocrText.slice(0, 300)
  };
};
