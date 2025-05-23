import Book from '../models/book.js';
import History from '../models/history.js';

// Get all books with pagination
export const getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    
    const query = {};
    
    // Filter by category if provided
    if (category) {
      query.categories = category;
    }
    
    // Search by title, author, or description if provided
    if (search) {
      query.$text = { $search: search };
    }
    
    // Get books with pagination
    const books = await Book.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    // Get total count for pagination
    const total = await Book.countDocuments(query);
    
    return res.status(200).json({
      success: true,
      data: {
        books,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get books',
      error: error.message
    });
  }
};

// Get book by ID
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const book = await Book.findById(id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    // Get user's history for this book if authenticated
    let history = null;
    if (req.user) {
      history = await History.findOne({
        userId: req.user._id,
        bookId: book._id
      });
    }
    
    return res.status(200).json({
      success: true,
      data: {
        book,
        history: history ? {
          lastPage: history.lastPage,
          progress: history.progress,
          lastReadAt: history.lastReadAt
        } : null
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get book',
      error: error.message
    });
  }
};

// Get book categories
export const getCategories = async (req, res) => {
  try {
    // Get all unique categories
    const categories = await Book.distinct('categories');
    
    return res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get categories',
      error: error.message
    });
  }
};

console.log('Book controller loaded');