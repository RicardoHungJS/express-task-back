import { Boom } from '@hapi/boom';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const whitelist = process.env.CORS_WHITELIST?.split(',') || [];

const CORS_ERROR_MESSAGE = 'Not allowed by CORS';

console.log('White list: ', whitelist);
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(Boom.forbidden(CORS_ERROR_MESSAGE));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const corsMiddleware = cors(corsOptions);
export default corsMiddleware;
