import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  coverImage: {
    type: String
  },
  categories: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  content: {
    type: String // This could be a reference to a file or the actual content
  },
  metadata: {
    pages: Number,
    language: String,
    publishedDate: Date,
    publisher: String,
    isbn: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add text index for search functionality
bookSchema.index({ 
  title: 'text', 
  author: 'text', 
  description: 'text',
  'metadata.publisher': 'text'
});

const Book = mongoose.model('Book', bookSchema);

export default Book;

console.log('Book model loaded');