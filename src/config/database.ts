import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI || '');

const connectDB = async () => {
  try {
    await client.connect();
    console.log('MongoDB Connected successfully');
    return client; 
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
