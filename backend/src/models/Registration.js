import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema({
  inquiryId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  husbandName: {
    type: String,
    required: true,
    trim: true
  },
  wifeName: {
    type: String,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  couplePhoto: {
    type: String,
    required: true
  },
  paymentScreenshot: {
    type: String,
    required: true
  },
  utr: {
    type: String,
    default: ''
  },
  payeeNameFromReceipt: {
    type: String,
    default: 'Not detected'
  },
  tier: {
    type: Number,
    required: true,
    default: 1
  },
  tierName: {
    type: String,
    default: 'Early Access (પહેલા 50 કપલ માટે)'
  },
  amount: {
    type: Number,
    required: true,
    default: 600
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    index: true
  },
  rejectionReason: {
    type: String,
    default: ''
  },
  attendance: {
    checkedIn: { type: Boolean, default: false },
    checkedInAt: { type: Date, default: null }
  },
  adminNotes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export const Registration = mongoose.model('Registration', RegistrationSchema);
