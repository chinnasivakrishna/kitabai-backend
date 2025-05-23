import express from 'express';
import { requestOTP, verifyOTP } from '../controllers/auth.js';

const router = express.Router();

// Auth routes
router.post('/request-otp', requestOTP);
router.post('/verify-otp', verifyOTP);

export default router;

console.log('Auth routes loaded');