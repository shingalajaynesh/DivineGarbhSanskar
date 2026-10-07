import mongoose from 'mongoose';

const TierSchema = new mongoose.Schema({
  tierNumber: { type: Number, required: true },
  name: { type: String, required: true },
  minCouple: { type: Number, required: true },
  maxCouple: { type: Number, required: true },
  price: { type: Number, required: true }
}, { _id: false });

const EventSettingSchema = new mongoose.Schema({
  key: { type: String, default: 'divy-garbhyatra', unique: true },
  title: { type: String, default: 'દિવ્ય ગર્ભયાત્રા' },
  subtitle: { type: String, default: 'Couple Seminar • The Divine Garbh Sanskar' },
  dateGujarati: { type: String, default: '19 December 2026, શનિવાર' },
  dateIso: { type: String, default: '2026-12-19' },
  time: { type: String, default: 'રાત્રે 8:30 PM થી 12:00 PM' },
  venue: { type: String, default: 'જમના બા ભવન, સુરત' },
  venueAddress: { type: String, default: 'Jamna Baa Bhavan, Surat, Gujarat' },
  speaker: { type: String, default: 'નેહલ ગઢવી' },
  speakerTitle: { type: String, default: 'Life Coach & Garbh Sanskar Expert' },
  upiId: { type: String, default: 'thedivinegarbhsanskar@okaxis' },
  payeeName: { type: String, default: 'The Divine Garbh Sanskar' },
  totalCoupleCapacity: { type: Number, default: 250 },
  tiers: {
    type: [TierSchema],
    default: [
      { tierNumber: 1, name: 'Early Bird (પહેલા 50 કપલ માટે)', minCouple: 1, maxCouple: 50, price: 900 },
      { tierNumber: 2, name: 'Phase 2 (51 થી 100 કપલ)', minCouple: 51, maxCouple: 100, price: 1100 },
      { tierNumber: 3, name: 'Phase 3 (101 થી 150 કપલ)', minCouple: 101, maxCouple: 150, price: 1300 },
      { tierNumber: 4, name: 'Phase 4 (151 થી 200 કપલ)', minCouple: 151, maxCouple: 200, price: 1500 },
      { tierNumber: 5, name: 'Final Phase (201 થી 250 કપલ)', minCouple: 201, maxCouple: 250, price: 1800 }
    ]
  },
  customQrImage: { type: String, default: '' },
  useCustomQr: { type: Boolean, default: false },
  speakerBio: { type: String, default: 'Vedic Prenatal Science Guide & Inspirational Speaker' },
  speakerPhoto: { type: String, default: '' },
  supportPhone: { type: String, default: '+91 94285 24890' },
  supportWhatsapp: { type: String, default: '919586979897' },
  venueMapUrl: { type: String, default: 'https://maps.google.com' },
  isRegistrationOpen: { type: Boolean, default: true },
  registrationClosedNotice: { type: String, default: 'દિલગીર છીએ, રજીસ્ટ્રેશન હાલ પૂર્ણ થયેલ છે.' },
  passNotice: { type: String, default: 'કૃપા કરીને સમયસર પહોંચવું. ગેટ પર ડિજિટલ પાસ QR કોડ બતાવવો ફરજિયાત છે.' }
}, { timestamps: true });

export const EventSetting = mongoose.model('EventSetting', EventSettingSchema);

export const getOrCreateEventSetting = async () => {
  let setting = await EventSetting.findOne({ key: 'divy-garbhyatra' });
  if (!setting) {
    setting = await EventSetting.create({
      key: 'divy-garbhyatra'
    });
    console.log('[EventSetting] Initialized default event settings for Divya Garbh Yatra');
  }
  return setting;
};
