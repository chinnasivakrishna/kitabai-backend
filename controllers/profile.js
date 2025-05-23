import User from '../models/user.js';

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    
    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        preferences: user.preferences,
        lastActive: user.lastActive,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get profile',
      error: error.message
    });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email, preferences } = req.body;
    const user = req.user;
    
    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };
    
    await user.save();
    
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: user._id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        preferences: user.preferences
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
};

// Upload profile picture
export const uploadProfilePicture = async (req, res) => {
  try {
    // In a real implementation, you would handle file upload
    // and store the file path or URL in the user's profile
    const { profilePictureUrl } = req.body;
    
    if (!profilePictureUrl) {
      return res.status(400).json({
        success: false,
        message: 'Profile picture URL is required'
      });
    }
    
    const user = req.user;
    user.profilePicture = profilePictureUrl;
    await user.save();
    
    return res.status(200).json({
      success: true,
      message: 'Profile picture updated successfully',
      data: {
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to upload profile picture',
      error: error.message
    });
  }
};

console.log('Profile controller loaded');