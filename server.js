import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import authRoutes from './api/auth.js';
import demoRoutes from './api/demo.js';
import userRoutes from './api/user.js';
import connectDB from './api/db/connection.js';
import { 
  globalErrorHandler, 
  notFoundHandler, 
  setupProcessErrorHandlers 
} from './api/middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Setup process error handlers
setupProcessErrorHandlers();

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3004;

// Initialize database connection (non-blocking)
const initializeDatabase = async () => {
  try {
    await connectDB();
  } catch (error) {
    // Connection handled in connectDB function
    // Server continues running even if database connection fails
  }
};

// Start database connection in background
initializeDatabase();

// Enable compression
app.use(compression());

// Parse JSON bodies with error handling
app.use(express.json({ 
  limit: '10mb',
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      res.status(400).json({
        success: false,
        message: 'Invalid JSON format',
        type: 'ValidationError'
      });
      return;
    }
  }
}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const userAgent = req.get('User-Agent') || 'Unknown';
  console.log(`📝 ${timestamp} - ${req.method} ${req.url} - IP: ${req.ip} - User-Agent: ${userAgent.substring(0, 100)}...`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'Server running',
      port: PORT,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime()
    }
  });
});

// API routes with error handling
try {
  app.use('/api/auth', authRoutes);
  app.use('/api/demo', demoRoutes);
  app.use('/api/user', userRoutes);
} catch (error) {
  console.error('❌ Route setup failed:', error);
  process.exit(1);
}

// Handle 404 for API routes (must come before static file serving)
app.use('/api/*', notFoundHandler);

// Serve static files from the dist directory with error handling
app.use(express.static(join(__dirname, 'dist'), {
  maxAge: process.env.NODE_ENV === 'production' ? '1y' : '0',
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    try {
      // Set cache headers based on file type
      if (path.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      } else if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000');
      }
    } catch (error) {
      console.error('Error setting cache headers:', error);
    }
  }
}));

// For SPA routing - redirect all requests to index.html
app.get('*', (req, res) => {
  try {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      type: 'ServerError'
    });
  }
});

// Global error handler (must be last)
app.use(globalErrorHandler);

// Start the server with error handling
const server = app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth status: http://localhost:${PORT}/api/auth/health`);
  console.log(`📝 Demo status: http://localhost:${PORT}/api/demo/health`);
  
  // Check if MongoDB is needed
  if (!process.env.MONGODB_URI) {
    console.log('\n💡 To enable authentication:');
    console.log('   Run: npm run setup-db');
    console.log('   Or visit: https://www.mongodb.com/atlas');
  }
  
  console.log('\n✅ Server is ready for requests');
  console.log('📁 API Structure:');
  console.log('   /api/auth     - Authentication endpoints');
  console.log('   /api/demo     - Demo request endpoints');
  console.log('   /api/user     - User profile management');
  console.log(`🛡️  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⚡ Node.js: ${process.version}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
}); 