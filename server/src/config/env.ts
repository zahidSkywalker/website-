import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/bd_shop',
  jwtSecret: process.env.JWT_SECRET || 'change_me_in_env',
  corsOrigin: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(','),
};

