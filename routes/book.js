import express from 'express';
import { getBooks, getBookById, getCategories } from '../controllers/book.js';

const router = express.Router();

// Book routes (no authentication required for reading)
router.get('/', getBooks);
router.get('/categories', getCategories);
router.get('/:id', getBookById);

export default router;

console.log('Book routes loaded');