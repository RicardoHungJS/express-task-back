import corsMiddleware from './src/middlewares/cors.mjs';
import { config } from 'dotenv';
import express from 'express';
import connectDB from './src/config/db.js';
import router from './src/routes/routes.js';
import { errorHandler } from './src/middlewares/errorsHandler.mjs';
import { requestLogger } from './src/middlewares/logger.mjs';

const app = express();
app.use(corsMiddleware);

config({ path: '.env' });
connectDB();

app.use(express.json());

// request login middleware
app.use(requestLogger);

// Validating api functionality
app.get('/', (req, res) => {
  res.send('API is working...');
});

app.use(errorHandler);

// load routes
app.use('/api/v1', router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});