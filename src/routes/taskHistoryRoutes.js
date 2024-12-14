import express from 'express';
import { getTaskHistory } from '../controllers/taskHistoryController.js';

const router = express.Router();

router.get('/', getTaskHistory);

export default router;
