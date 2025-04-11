import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Please provide MONGODB_URI in environment variables");
}

const MONGODB_URI = process.env.MONGODB_URI;

// Create GridFS storage configuration
const storage = ((DB:string)=>{
  return new GridFsStorage({
    // replace <DB> with the database name
    url: MONGODB_URI.replace(/<DB>/, DB),
    file: (req, file) => {
      return new Promise((resolve) => {
        const filename = `${Date.now()}-${file.originalname}`;
        const fileInfo = {
          filename,
          bucketName: 'images'
        };
        resolve(fileInfo);
      });
    }
  })
})("files");

// Create multer upload instance
export const upload = multer({ storage });

// Database connection function with retry logic
export const connectToDatabase = async (DB:string) => {
  try {
    let prevConnection = ""
    
    if (mongoose.connection.readyState === 1) {
      if(DB===prevConnection){
        return; // Already connected
      }else{
        prevConnection = DB
        mongoose.connection.close()
      }
    }

    await mongoose.connect(MONGODB_URI.replace(/<DB>/, DB), {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      maxPoolSize: 10
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Ensure proper cleanup on process termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});