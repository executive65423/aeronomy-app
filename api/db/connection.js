import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aeronomy';
const NODE_ENV = process.env.NODE_ENV || 'development';

let mongoServer = null;
let isConnected = false;

const connectDB = async () => {
  try {
    // If no MongoDB URI is provided and we're in development, use MongoDB Memory Server
    if (!process.env.MONGODB_URI && NODE_ENV === 'development') {
      try {
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        
        // Configure for Windows compatibility
        mongoServer = await MongoMemoryServer.create({
          binary: {
            version: '6.0.4', // Use a stable version that works on Windows
            downloadDir: './mongodb-binaries',
            skipMD5: true
          },
          instance: {
            port: 27018, // Use different port to avoid conflicts
            dbName: 'aeronomy'
          }
        });
        
        const uri = mongoServer.getUri();
        console.log('✅ Using MongoDB Memory Server at:', uri);
        
        const conn = await mongoose.connect(uri);
        
        console.log(`✅ MongoDB Memory Server Connected: ${conn.connection.host}`);
        console.log(`📁 Database: ${conn.connection.name}`);
        isConnected = true;
        return conn;
      } catch (memoryServerError) {
        console.log('⚠️  MongoDB Memory Server failed:', memoryServerError.message);
        console.log('🔄 Trying local MongoDB...');
        // Fall back to local MongoDB
      }
    }
    
    // Connect to local MongoDB or provided URI
    console.log('🔗 Attempting to connect to MongoDB:', MONGODB_URI);
    const conn = await mongoose.connect(MONGODB_URI);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📁 Database: ${conn.connection.name}`);
    isConnected = true;
    return conn;
    
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    
    // Don't crash the server - just show warnings
    console.warn('\n⚠️  WARNING: Server starting without database connection');
    console.warn('🔧 Authentication features will not work until MongoDB is configured\n');
    
    // Provide helpful error messages
    if (error.message.includes('ECONNREFUSED')) {
      console.error('💡 Quick Solutions:');
      console.error('');
      console.error('🚀 EASIEST: Use MongoDB Atlas (Free Cloud Database)');
      console.error('   1. Go to: https://www.mongodb.com/atlas');
      console.error('   2. Create free account and cluster');
      console.error('   3. Get connection string');
      console.error('   4. Create .env file with: MONGODB_URI=mongodb+srv://...');
      console.error('   5. Restart server');
      console.error('');
      console.error('🔧 OR: Install Local MongoDB');
      console.error('   Windows: https://www.mongodb.com/try/download/community');
      console.error('');
      console.error('⚡ OR: Use Docker');
      console.error('   Run: docker run -d -p 27017:27017 --name mongodb mongo:6.0');
      console.error('');
      console.error('📚 For detailed help: npm run setup-db');
    }
    
    // Return null instead of exiting
    isConnected = false;
    return null;
  }
};

// Check if database is connected
export const isDatabaseConnected = () => isConnected;

// Graceful shutdown
const gracefulShutdown = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed.');
    }
    
    if (mongoServer) {
      await mongoServer.stop();
      console.log('MongoDB Memory Server stopped.');
    }
  } catch (error) {
    console.error('Error during shutdown:', error);
  }
};

// Handle process termination
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

export default connectDB; 