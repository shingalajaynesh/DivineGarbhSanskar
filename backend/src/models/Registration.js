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
    default: ''
  },
  paymentScreenshot: {
    type: String,
    default: ''
  },
  utr: {
    type: String,
    default: '',
    index: true
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
  paymentMethod: {
    type: String,
    enum: ['UPI', 'CASH', 'DIRECT_TRANSFER', 'VIP', 'COMPLIMENTARY'],
    default: 'UPI'
  },
  isManualEntry: {
    type: Boolean,
    default: false
  },
  isFlaggedFake: {
    type: Boolean,
    default: false,
    index: true
  },
  fakeReason: {
    type: String,
    default: ''
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

// Performance Indexes for sub-second sorting and status queries
RegistrationSchema.index({ status: 1, createdAt: -1 });
RegistrationSchema.index({ createdAt: -1 });
RegistrationSchema.index({ phoneNumber: 1, createdAt: -1 });

export const Registration = mongoose.model('Registration', RegistrationSchema);
