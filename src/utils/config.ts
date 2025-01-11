// src/utils/config.ts
import * as dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || '',
  POLYGON_RPC_URL: process.env.POLYGON_RPC_URL || '',
  // Add any other config values here
};
