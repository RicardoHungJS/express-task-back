import { config } from 'dotenv';
config({ path: '.env' });
import express from 'express';
import connectDB from './src/config/db.js';
import { errorHandler } from './src/middlewares/errorsHandler.mjs';
import { requestLogger } from './src/middlewares/logger.mjs';
import router from './src/routes/routes.js';
import setupSwagger from './swagger.js';
import corsMiddleware from './src/middlewares/cors.mjs';

const app = express();
app.use(corsMiddleware);

connectDB();
console.log('Starting server...');

app.use(express.json());
setupSwagger(app);

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
