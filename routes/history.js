import express from 'express';
import { 
  getReadingHistory, 
  updateReadingProgress, 
  addNote, 
  getNotes 
} from '../controllers/history.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// History routes (all require authentication)
router.get('/', authenticate, getReadingHistory);
router.put('/:bookId', authenticate, updateReadingProgress);
router.post('/:bookId/notes', authenticate, addNote);
router.get('/:bookId/notes', authenticate, getNotes);

export default router;

console.log('History routes loaded');