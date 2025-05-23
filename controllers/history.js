import History from '../models/history.js';
import Book from '../models/book.js';

// Get user's reading history
export const getReadingHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get user's reading history with book details
    const history = await History.find({ userId })
      .sort({ lastReadAt: -1 })
      .populate('bookId', 'title author coverImage metadata.pages');
    
    return res.status(200).json({
      success: true,
      data: history
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get reading history',
      error: error.message
    });
  }
};

// Update reading progress
export const updateReadingProgress = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { page, progress } = req.body;
    const userId = req.user._id;
    
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    // Find or create history record
    let history = await History.findOne({ userId, bookId });
    
    if (!history) {
      history = await History.create({
        userId,
        bookId,
        lastPage: page || 1,
        progress: progress || 0,
        lastReadAt: new Date()
      });
    } else {
      // Update history record
      if (page) history.lastPage = page;
      if (progress !== undefined) history.progress = progress;
      history.lastReadAt = new Date();
      await history.save();
    }
    
    return res.status(200).json({
      success: true,
      message: 'Reading progress updated successfully',
      data: {
        lastPage: history.lastPage,
        progress: history.progress,
        lastReadAt: history.lastReadAt
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update reading progress',
      error: error.message
    });
  }
};

// Add note to a book
export const addNote = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { page, content } = req.body;
    const userId = req.user._id;
    
    if (!page || !content) {
      return res.status(400).json({
        success: false,
        message: 'Page and content are required'
      });
    }
    
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    // Find or create history record
    let history = await History.findOne({ userId, bookId });
    
    if (!history) {
      history = await History.create({
        userId,
        bookId,
        lastPage: page,
        notes: [{ page, content }]
      });
    } else {
      // Add note to history record
      history.notes.push({ page, content });
      await history.save();
    }
    
    return res.status(200).json({
      success: true,
      message: 'Note added successfully',
      data: {
        note: history.notes[history.notes.length - 1]
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add note',
      error: error.message
    });
  }
};

// Get notes for a book
export const getNotes = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user._id;
    
    // Find history record
    const history = await History.findOne({ userId, bookId });
    
    if (!history) {
      return res.status(200).json({
        success: true,
        data: {
          notes: []
        }
      });
    }
    
    return res.status(200).json({
      success: true,
      data: {
        notes: history.notes
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get notes',
      error: error.message
    });
  }
};

console.log('History controller loaded');