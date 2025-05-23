import express from 'express';
import { 
  submitPaper, 
  getPapers, 
  getPaperById, 
  updatePaperFeedback 
} from '../controllers/paper.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Paper routes (all require authentication)
router.post('/', authenticate, submitPaper);
router.get('/', authenticate, getPapers);
router.get('/:id', authenticate, getPaperById);
router.put('/:id/feedback', updatePaperFeedback); // This would typically be protected by admin middleware

export default router;

console.log('Paper routes loaded');