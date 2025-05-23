import Paper from '../models/paper.js';

// Submit a paper for checking
export const submitPaper = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id;
    
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }
    
    // Create new paper
    const paper = await Paper.create({
      userId,
      title,
      content,
      status: 'submitted'
    });
    
    // In a real implementation, you would trigger the paper checking process here
    // For example, send the paper to an AI service for analysis
    
    return res.status(201).json({
      success: true,
      message: 'Paper submitted successfully',
      data: {
        paper
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to submit paper',
      error: error.message
    });
  }
};

// Get user's papers
export const getPapers = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get user's papers
    const papers = await Paper.find({ userId })
      .sort({ submittedAt: -1 });
    
    return res.status(200).json({
      success: true,
      data: {
        papers
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get papers',
      error: error.message
    });
  }
};

// Get paper by ID
export const getPaperById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    
    // Find paper
    const paper = await Paper.findOne({ _id: id, userId });
    
    if (!paper) {
      return res.status(404).json({
        success: false,
        message: 'Paper not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: {
        paper
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get paper',
      error: error.message
    });
  }
};

// Update paper feedback (this would typically be called by an admin or AI service)
export const updatePaperFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { score, comments, suggestedImprovements } = req.body;
    
    // Find paper
    const paper = await Paper.findById(id);
    
    if (!paper) {
      return res.status(404).json({
        success: false,
        message: 'Paper not found'
      });
    }
    
    // Update paper feedback
    paper.status = 'completed';
    paper.feedback = {
      score,
      comments,
      suggestedImprovements
    };
    paper.completedAt = new Date();
    
    await paper.save();
    
    return res.status(200).json({
      success: true,
      message: 'Paper feedback updated successfully',
      data: {
        paper
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update paper feedback',
      error: error.message
    });
  }
};

console.log('Paper controller loaded');