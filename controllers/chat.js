import Chat from '../models/chat.js';
import Book from '../models/book.js';

// Get chat history with a book
export const getChatHistory = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user._id;
    
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    // Find or create chat
    let chat = await Chat.findOne({ userId, bookId });
    
    if (!chat) {
      chat = await Chat.create({
        userId,
        bookId,
        messages: []
      });
    }
    
    return res.status(200).json({
      success: true,
      data: {
        chat
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get chat history',
      error: error.message
    });
  }
};

// Send message to a book
export const sendMessage = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { message } = req.body;
    const userId = req.user._id;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
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
    
    // Find or create chat
    let chat = await Chat.findOne({ userId, bookId });
    
    if (!chat) {
      chat = await Chat.create({
        userId,
        bookId,
        messages: []
      });
    }
    
    // Add user message
    chat.messages.push({
      sender: 'user',
      content: message
    });
    
    // Generate book response (this would be integrated with an AI service)
    const bookResponse = await generateBookResponse(book, message);
    
    // Add book response
    chat.messages.push({
      sender: 'book',
      content: bookResponse
    });
    
    // Update last updated timestamp
    chat.lastUpdated = new Date();
    
    await chat.save();
    
    return res.status(200).json({
      success: true,
      data: {
        message: {
          sender: 'book',
          content: bookResponse,
          timestamp: new Date()
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message
    });
  }
};

// Helper function to generate book response (placeholder for AI integration)
const generateBookResponse = async (book, message) => {
  // This is a placeholder for AI service integration
  // In a real implementation, you would use an AI service like OpenAI
  
  // Simple placeholder response
  return `As "${book.title}" by ${book.author}, I would respond: This is a simulated response. In a real implementation, this would be generated by an AI service based on the book's content and the user's message.`;
};

console.log('Chat controller loaded');