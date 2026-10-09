import QRCode from 'qrcode';

/**
 * High-Resolution Canvas Digital Ticket Generator for Divya Garbh Yatra
 * Renders a luxury 720x1280 couple event pass suitable for download & gate scanning.
 */
export const generateDigitalPassCanvas = async (canvas, data) => {
  if (!canvas || !data) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = 720;
  const height = 1280;
  canvas.width = width;
  canvas.height = height;

  // 1. Background Luxury Gradient (Sacred Temple Maroon & Royal Gold Ambience)
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#3A0E02');
  bgGrad.addColorStop(0.3, '#280A00');
  bgGrad.addColorStop(0.7, '#1D0600');
  bgGrad.addColorStop(1, '#120300');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Gold Border Framing
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(28, 28, width - 56, height - 56);

  // Corner decorative accents
  const drawCorner = (x, y, dx, dy) => {
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y + dy * 20);
    ctx.lineTo(x, y);
    ctx.lineTo(x + dx * 20, y);
    ctx.stroke();
  };
  drawCorner(20, 20, 1, 1);
  drawCorner(width - 20, 20, -1, 1);
  drawCorner(20, height - 20, 1, -1);
  drawCorner(width - 20, height - 20, -1, -1);

  // 3. Brand & Event Header
  try {
    const logoImg = await loadImage('/logo.jpg');
    const logoSize = 46;
    const logoX = width / 2 - logoSize / 2;
    const logoY = 32;

    ctx.save();
    ctx.beginPath();
    ctx.arc(width / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
    ctx.restore();

    // Golden ring around logo
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(width / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
    ctx.stroke();
  } catch (logoErr) {
    console.warn('Canvas logo load deferred:', logoErr);
  }

  ctx.textAlign = 'center';
  ctx.fillStyle = '#D4AF37';
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('THE DIVINE GARBH SANSKAR', width / 2, 98);

  ctx.fillStyle = '#FF8C00';
  ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('COUPLE SEMINAR • SPECIAL PROGRAM', width / 2, 118);

  // Event Main Gujarati Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 42px "Noto Sans Gujarati", sans-serif';
  ctx.fillText('દિવ્ય ગર્ભયાત્રા', width / 2, 165);

  // Subtitle
  ctx.fillStyle = '#E2E8F0';
  ctx.font = 'italic 15px "Playfair Display", serif';
  ctx.fillText('પ્રેમ, સંસ્કાર અને સમર્પણની અનોખી સફર', width / 2, 195);

  // Divider line
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
  ctx.beginPath();
  ctx.moveTo(80, 210);
  ctx.lineTo(width - 80, 210);
  ctx.stroke();

  // 4. Couple Photo Portrait Box
  const photoX = width / 2 - 150;
  const photoY = 230;
  const photoW = 300;
  const photoH = 300;

  // Background frame
  ctx.fillStyle = '#2A0A01';
  ctx.fillRect(photoX, photoY, photoW, photoH);

  if (data.couplePhoto) {
    try {
      const coupleImg = await loadImage(data.couplePhoto);
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoW, photoH, 16);
      ctx.clip();

      // Cover aspect ratio
      const aspect = coupleImg.width / coupleImg.height;
      let sW = photoW;
      let sH = photoH;
      let ox = photoX;
      let oy = photoY;
      if (aspect > 1) {
        sW = photoH * aspect;
        ox = photoX - (sW - photoW) / 2;
      } else {
        sH = photoW / aspect;
        oy = photoY - (sH - photoH) / 2;
      }
      ctx.drawImage(coupleImg, ox, oy, sW, sH);
      ctx.restore();
    } catch (e) {
      console.warn('Failed to load couple image into canvas', e);
    }
  }

  // Gold border around couple photo
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(photoX, photoY, photoW, photoH, 16);
  ctx.stroke();

  // 5. Couple Name Plaque
  const plaqueY = 560;
  ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
  ctx.beginPath();
  ctx.roundRect(60, plaqueY, width - 120, 90, 12);
  ctx.fill();
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#F59E0B';
  ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('COUPLE REGISTRATION', width / 2, plaqueY + 28);

  const coupleFullName = `${data.husbandName || ''} & ${data.wifeName || ''} ${data.surname || ''}`.toUpperCase();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 24px "Noto Sans Gujarati", "Plus Jakarta Sans", sans-serif';
  ctx.fillText(coupleFullName, width / 2, plaqueY + 62);

  // 6. Token ID & Entry Status Banner
  const tokenY = 675;
  ctx.fillStyle = '#B91C1C';
  ctx.beginPath();
  ctx.roundRect(width / 2 - 140, tokenY, 280, 40, 20);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px monospace';
  ctx.fillText(`PASS ID: ${data.inquiryId || 'CPL-XXXX'}`, width / 2, tokenY + 26);

  // 7. Event Key Details Section
  const detailsY = 745;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.beginPath();
  ctx.roundRect(60, detailsY, width - 120, 240, 14);
  ctx.fill();
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
  ctx.stroke();

  // Detail Item 1: Date & Day
  ctx.textAlign = 'left';
  ctx.fillStyle = '#D4AF37';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('📅 તારીખ:', 85, detailsY + 40);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px "Noto Sans Gujarati", sans-serif';
  ctx.fillText('19 December 2026, શનિવાર', 170, detailsY + 40);

  // Detail Item 2: Time
  ctx.fillStyle = '#D4AF37';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('⏰ સમય:', 85, detailsY + 85);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 17px "Noto Sans Gujarati", sans-serif';
  ctx.fillText('રાત્રે 8:30 PM થી 12:00 PM', 170, detailsY + 85);

  // Detail Item 3: Venue
  ctx.fillStyle = '#D4AF37';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('📍 સ્થળ:', 85, detailsY + 130);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 17px "Noto Sans Gujarati", sans-serif';
  ctx.fillText('જમના બા ભવન, સુરત (Jamna Baa Bhavan)', 170, detailsY + 130);

  // Detail Item 4: Speaker (Nehal Gadhavi)
  ctx.fillStyle = '#D4AF37';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('🎤 વક્તા:', 85, detailsY + 175);
  ctx.fillStyle = '#FFD600';
  ctx.font = 'bold 18px "Noto Sans Gujarati", sans-serif';
  ctx.fillText('નેહલ ગઢવી (Life Coach & Expert)', 170, detailsY + 175);

  // Detail Item 5: Admit
  ctx.fillStyle = '#D4AF37';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('🎟️ પ્રવેશ:', 85, detailsY + 215);
  ctx.fillStyle = '#10B981';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('ADMIT ONE COUPLE (2 PERSONS)', 170, detailsY + 215);

  // 8. Gate QR Code for real-time gate scanner
  const qrSize = 130;
  const qrX = width / 2 - qrSize / 2;
  const qrY = 1010;

  try {
    const qrDataUrl = await QRCode.toDataURL(data.inquiryId || 'CPL-TEST', {
      margin: 1,
      width: qrSize,
      color: {
        dark: '#1A0500',
        light: '#FFFFFF'
      }
    });
    const qrImg = await loadImage(qrDataUrl);

    // QR container box
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20, 10);
    ctx.fill();

    ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
  } catch (qrErr) {
    console.warn('QR code generation failed', qrErr);
  }

  // 9. Gate Scanner Instructions
  ctx.textAlign = 'center';
  ctx.fillStyle = '#D4AF37';
  ctx.font = 'bold 13px sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('GATE ENTRY VERIFICATION QR CODE', width / 2, 1175);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '12px "Noto Sans Gujarati", sans-serif';
  ctx.fillText('કૃપા કરીને આ પાસ સેમિનારના ગેટ પર એન્ટ્રી વખતે બતાવો.', width / 2, 1200);

  ctx.fillStyle = '#64748B';
  ctx.font = '11px sans-serif';
  ctx.fillText('The Divine Garbh Sanskar • Helpline: +91 95869 79897', width / 2, 1225);
};

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
};
