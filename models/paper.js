import mongoose from 'mongoose';

const paperSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['submitted', 'checking', 'completed'],
    default: 'submitted'
  },
  feedback: {
    score: Number,
    comments: String,
    suggestedImprovements: [String]
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
});

const Paper = mongoose.model('Paper', paperSchema);

export default Paper;

console.log('Paper model loaded');