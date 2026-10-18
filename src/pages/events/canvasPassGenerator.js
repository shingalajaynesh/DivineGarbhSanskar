import QRCode from 'qrcode';

/**
 * Ultra-High-Resolution Canvas Ticket Generator for Divya Garbh Yatra
 * Renders an executive 800x1350 luxury couple pass matching official event branding.
 */
export const generateDigitalPassCanvas = async (canvas, data) => {
  if (!canvas || !data) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = 800;
  const height = 1350;
  canvas.width = width;
  canvas.height = height;

  // 1. Crisp Luxury Background (Soft Ivory / Cream with Subtle Warm Glow)
  ctx.fillStyle = '#FAF9F6';
  ctx.fillRect(0, 0, width, height);

  // Decorative luxury border
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, width - 48, height - 48);

  ctx.strokeStyle = '#F1E5C8';
  ctx.lineWidth = 1;
  ctx.strokeRect(32, 32, width - 64, height - 64);

  // Corner Accents
  const drawCorner = (x, y, dx, dy) => {
    ctx.strokeStyle = '#B45309';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(x, y + dy * 28);
    ctx.lineTo(x, y);
    ctx.lineTo(x + dx * 28, y);
    ctx.stroke();
  };
  drawCorner(24, 24, 1, 1);
  drawCorner(width - 24, 24, -1, 1);
  drawCorner(24, height - 24, 1, -1);
  drawCorner(width - 24, height - 24, -1, -1);

  // 2. Header: Logo & Organization
  try {
    const logoImg = await loadImage('/logo.jpg');
    const logoSize = 64;
    const logoX = width / 2 - logoSize / 2;
    const logoY = 46;

    ctx.save();
    ctx.beginPath();
    ctx.arc(width / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
    ctx.restore();

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(width / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
    ctx.stroke();
  } catch (err) {
    console.warn('Canvas logo load deferred:', err);
  }

  // Brand Name
  ctx.textAlign = 'center';
  ctx.fillStyle = '#5D1A00';
  ctx.font = 'bold 18px "Inter", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('THE DIVINE GARBH SANSKAR', width / 2, 138);

  ctx.fillStyle = '#B45309';
  ctx.font = 'bold 12px "Inter", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('OFFICIAL VIP COUPLE PASS • SPECIAL SEMINAR', width / 2, 158);

  // Main Gujarati Title
  ctx.fillStyle = '#881337';
  ctx.font = 'bold 44px "Noto Sans Gujarati", "Inter", sans-serif';
  ctx.fillText('દિવ્ય ગર્ભયાત્રા', width / 2, 210);

  // Tagline
  ctx.fillStyle = '#78716C';
  ctx.font = 'italic 16px "Inter", serif';
  ctx.fillText('પ્રેમ, સંસ્કાર અને સમર્પણની અનોખી સફર', width / 2, 240);

  // Divider
  ctx.strokeStyle = '#E7E5E4';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(60, 260);
  ctx.lineTo(width - 60, 260);
  ctx.stroke();

  // 3. Couple Photo Section
  const photoSize = 220;
  const photoX = width / 2 - photoSize / 2;
  const photoY = 285;

  // Background frame
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(photoX, photoY, photoSize, photoSize, 24);
  ctx.fill();

  let hasPhoto = false;
  if (data.couplePhoto) {
    try {
      const coupleImg = await loadImage(data.couplePhoto);
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoSize, photoSize, 24);
      ctx.clip();

      const aspect = coupleImg.width / coupleImg.height;
      let sW = photoSize;
      let sH = photoSize;
      let ox = photoX;
      let oy = photoY;
      if (aspect > 1) {
        sW = photoSize * aspect;
        ox = photoX - (sW - photoSize) / 2;
      } else {
        sH = photoSize / aspect;
        oy = photoY - (sH - photoSize) / 2;
      }
      ctx.drawImage(coupleImg, ox, oy, sW, sH);
      ctx.restore();
      hasPhoto = true;
    } catch (e) {
      console.warn('Failed to load couple image into canvas', e);
    }
  }

  if (!hasPhoto) {
    ctx.fillStyle = '#FEF3C7';
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoSize, photoSize, 24);
    ctx.fill();

    ctx.fillStyle = '#78350F';
    ctx.font = 'bold 52px "Inter", sans-serif';
    const initials = `${data.husbandName?.charAt(0) || ''}${data.wifeName?.charAt(0) || ''}`.toUpperCase();
    ctx.fillText(initials || 'CPL', width / 2, photoY + 130);
  }

  // Gold Ring border around couple photo
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(photoX, photoY, photoSize, photoSize, 24);
  ctx.stroke();

  // 4. Couple Full Name Plaque
  const nameY = 540;
  const coupleFullName = `${data.husbandName || ''} & ${data.wifeName || ''} ${data.surname || ''}`.toUpperCase();
  ctx.fillStyle = '#1C1917';
  ctx.font = 'bold 28px "Noto Sans Gujarati", "Inter", sans-serif';
  ctx.fillText(coupleFullName, width / 2, nameY);

  // Admit Badge
  ctx.fillStyle = '#065F46';
  ctx.font = 'bold 13px "Inter", sans-serif';
  ctx.letterSpacing = '1.5px';
  ctx.fillText('ADMIT ONE COUPLE (2 PERSONS) • VERIFIED', width / 2, nameY + 28);

  // Pass ID Pill
  const passIdY = nameY + 46;
  ctx.fillStyle = '#881337';
  ctx.beginPath();
  ctx.roundRect(width / 2 - 120, passIdY, 240, 36, 18);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 16px "Courier New", monospace';
  ctx.letterSpacing = '2px';
  ctx.fillText(`PASS ID: ${data.inquiryId || 'CPL-XXXX'}`, width / 2, passIdY + 24);

  // 5. Perforated Ticket Notches & Line
  const perfY = 675;
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(56, perfY);
  ctx.lineTo(width - 56, perfY);
  ctx.stroke();
  ctx.setLineDash([]); // Reset line dash

  // Semicircle Notches on sides
  ctx.fillStyle = '#FAF9F6';
  ctx.beginPath();
  ctx.arc(24, perfY, 18, -Math.PI / 2, Math.PI / 2);
  ctx.fill();
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(width - 24, perfY, 18, Math.PI / 2, -Math.PI / 2);
  ctx.fill();
  ctx.stroke();

  // 6. Event Details Card
  const detailsY = 715;
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(50, detailsY, width - 100, 260, 20);
  ctx.fill();
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.textAlign = 'left';

  // Date
  ctx.fillStyle = '#78716C';
  ctx.font = 'bold 12px "Inter", sans-serif';
  ctx.fillText('EVENT DATE / તારીખ:', 80, detailsY + 45);
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 20px "Noto Sans Gujarati", "Inter", sans-serif';
  ctx.fillText('19 December 2026, શનિવાર', 80, detailsY + 75);

  // Time
  ctx.fillStyle = '#78716C';
  ctx.font = 'bold 12px "Inter", sans-serif';
  ctx.fillText('EVENT TIME / સમય:', 440, detailsY + 45);
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 20px "Noto Sans Gujarati", "Inter", sans-serif';
  ctx.fillText('8:30 PM (પ્રવેશ 7:45 PM થી)', 440, detailsY + 75);

  // Horizontal separator inside box
  ctx.strokeStyle = '#F1F5F9';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(80, detailsY + 98);
  ctx.lineTo(width - 80, detailsY + 98);
  ctx.stroke();

  // Venue
  ctx.fillStyle = '#78716C';
  ctx.font = 'bold 12px "Inter", sans-serif';
  ctx.fillText('EVENT VENUE / સ્થળ:', 80, detailsY + 130);
  ctx.fillStyle = '#881337';
  ctx.font = 'bold 20px "Noto Sans Gujarati", "Inter", sans-serif';
  ctx.fillText('જમના બા ભવન, સુરત (Jamna Baa Bhavan)', 80, detailsY + 160);

  // Speaker
  ctx.fillStyle = '#78716C';
  ctx.font = 'bold 12px "Inter", sans-serif';
  ctx.fillText('SPECIAL SPEAKER / મુખ્ય વક્તા:', 80, detailsY + 198);
  ctx.fillStyle = '#B45309';
  ctx.font = 'bold 20px "Noto Sans Gujarati", "Inter", sans-serif';
  ctx.fillText('નેહલ ગઢવી (Life Coach & Expert)', 80, detailsY + 228);

  // 7. Gate Entry QR Code
  const qrBoxY = 1005;
  const qrSize = 150;
  const qrX = width / 2 - qrSize / 2;

  try {
    const qrDataUrl = await QRCode.toDataURL(data.inquiryId || 'CPL-TEST', {
      margin: 1,
      width: qrSize,
      color: {
        dark: '#0F172A',
        light: '#FFFFFF'
      }
    });
    const qrImg = await loadImage(qrDataUrl);

    // QR container
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(qrX - 12, qrBoxY - 12, qrSize + 24, qrSize + 24, 16);
    ctx.fill();
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.drawImage(qrImg, qrX, qrBoxY, qrSize, qrSize);
  } catch (qrErr) {
    console.warn('QR code generation failed', qrErr);
  }

  // 8. Gate Scan Instructions & Verification
  ctx.textAlign = 'center';
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 14px "Inter", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('GATE ENTRY VERIFICATION CODE', width / 2, qrBoxY + qrSize + 32);

  ctx.fillStyle = '#64748B';
  ctx.font = '13px "Noto Sans Gujarati", "Inter", sans-serif';
  ctx.fillText('સેમિનાર હોલમાં પ્રવેશ મેળવવા માટે આ QR કોડ ગેટ પર બતાવો.', width / 2, qrBoxY + qrSize + 54);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '11px "Inter", sans-serif';
  ctx.fillText('The Divine Garbh Sanskar • Helpline: +91 95869 79897 • www.thedivinegarbhsanskar.com', width / 2, qrBoxY + qrSize + 76);
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
