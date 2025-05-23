import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import OTP from '../models/otp.js';

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via SMS (integration with SMS service would be needed)
const sendOTP = async (phone, otp) => {
  // This is a placeholder for SMS service integration
  console.log(`Sending OTP ${otp} to ${phone}`);
  
  // In a real implementation, you would use an SMS service like Twilio
  // Example with Twilio:
  // const twilio = require('twilio');
  // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  // await client.messages.create({
  //   body: `Your OTP for Book App is: ${otp}`,
  //   from: process.env.TWILIO_PHONE_NUMBER,
  //   to: phone
  // });
  
  return true;
};

// Request OTP for login/registration
export const requestOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }
    
    // Generate OTP
    const otp = generateOTP();
    
    // Save OTP to database
    await OTP.findOneAndDelete({ phone }); // Delete any existing OTP
    await OTP.create({ phone, otp });
    
    // Send OTP via SMS
    await sendOTP(phone, otp);
    
    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
      error: error.message
    });
  }
};

// Verify OTP and login/register user
export const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    
    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and OTP are required'
      });
    }
    
    // Find OTP in database
    const otpRecord = await OTP.findOne({ phone, otp });
    
    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }
    
    // Delete OTP record
    await OTP.findByIdAndDelete(otpRecord._id);
    
    // Find or create user
    let user = await User.findOne({ phone });
    
    if (!user) {
      // Register new user
      user = await User.create({ phone });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          phone: user.phone,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture,
          isNewUser: !user.name // Check if user has completed profile
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to verify OTP',
      error: error.message
    });
  }
};

console.log('Auth controller loaded');