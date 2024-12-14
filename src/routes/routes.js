import express from 'express';
import taskRoutes from './taskRoutes.js';
import taskHistoryRoutes from './taskHistoryRoutes.js';

const router = express.Router();

router.use('/task', taskRoutes);
router.use('/taskHistory', taskHistoryRoutes);

export default router;
