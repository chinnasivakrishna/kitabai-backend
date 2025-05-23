import express from 'express';
import { getChatHistory, sendMessage } from '../controllers/chat.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Chat routes (all require authentication)
router.get('/:bookId', authenticate, getChatHistory);
router.post('/:bookId', authenticate, sendMessage);

export default router;

console.log('Chat routes loaded');