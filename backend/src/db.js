import dns from 'node:dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}
// Only override DNS in local dev if needed; preserve container DNS in Render/cloud environments
if (process.env.NODE_ENV !== 'production' && !process.env.RENDER) {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch {
    // Ignore fallback
  }
}

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB_NAME || 'divine_website_events';

export const connectDB = async (retries = 3) => {
  if (!MONGODB_URI) {
    console.warn('[MongoDB] MONGODB_URI is not set in environment. Running in disconnected mode.');
    return null;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const conn = await mongoose.connect(MONGODB_URI, {
        dbName: DB_NAME,
        family: 4,
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 45000
      });
      console.log(`[MongoDB] Connected successfully to database: ${conn.connection.name}`);
      return conn;
    } catch (err) {
      console.error(`[MongoDB] Connection attempt ${attempt} failed: ${err.message}`);
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
};
