import mongoose from 'mongoose';

const CounterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 1000 }
});

export const Counter = mongoose.model('Counter', CounterSchema);

export const getNextInquiryNumber = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: 'inquiryNumber' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return counter.seq;
};
