import cors from 'cors';

const whitelist = process.env.CORS_WHITELIST?.split(',') || [];

const CORS_ERROR_MESSAGE = 'Not allowed by CORS';

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(CORS_ERROR_MESSAGE));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const corsMiddleware = cors(corsOptions);
export default corsMiddleware;
