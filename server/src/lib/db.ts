import mongoose from 'mongoose';
import { env } from '../config/env';

export async function connectDatabase(): Promise<void> {
  if (mongoose.connection.readyState === 1) return;
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.mongoUri);
}

mongoose.connection.on('connected', () => {
  // eslint-disable-next-line no-console
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('MongoDB connection error', err);
});

