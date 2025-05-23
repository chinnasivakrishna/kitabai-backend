import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  lastPage: {
    type: Number,
    default: 1
  },
  progress: {
    type: Number, // Percentage of completion
    default: 0
  },
  lastReadAt: {
    type: Date,
    default: Date.now
  },
  notes: [{
    page: Number,
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const History = mongoose.model('History', historySchema);

export default History;

console.log('History model loaded');