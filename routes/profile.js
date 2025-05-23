import express from 'express';
import { getProfile, updateProfile, uploadProfilePicture } from '../controllers/profile.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Profile routes (all require authentication)
router.get('/', authenticate, getProfile);
router.put('/', authenticate, updateProfile);
router.post('/upload-picture', authenticate, uploadProfilePicture);

export default router;