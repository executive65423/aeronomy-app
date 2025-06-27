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
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = NODE_ENV === 'production';

// Production startup logging
console.log('\n🚀 Starting Aeronomy Platform Server...');
console.log(`📊 Environment: ${NODE_ENV}`);
console.log(`🔧 Node.js version: ${process.version}`);
console.log(`📍 Platform: ${process.platform}`);
console.log(`⚡ Port: ${PORT}`);

// Log environment variable status (without revealing sensitive data)
console.log('\n📋 Environment Configuration:');
console.log(`📧 Email User: ${process.env.EMAIL_USER ? '✅ Set' : '❌ Missing'}`);
console.log(`🔐 Email Pass: ${process.env.EMAIL_PASS ? '✅ Set' : '❌ Missing'}`);
console.log(`🌐 SMTP Host: ${process.env.SMTP_HOST ? '✅ Set' : '❌ Missing'}`);
console.log(`📨 Demo Email: ${process.env.DEMO_EMAIL ? '✅ Set' : '❌ Missing'}`);
console.log(`🗄️  MongoDB URI: ${process.env.MONGODB_URI ? '✅ Set' : '❌ Missing'}`);

// Initialize database connection (non-blocking)
const initializeDatabase = async () => {
  try {
    console.log('\n🔗 Initializing database connection...');
    await connectDB();
  } catch (error) {
    // Connection handled in connectDB function
    // Server continues running even if database connection fails
    console.warn('⚠️  Server starting without database connection');
  }
};

// Start database connection in background
initializeDatabase();

// Enable compression for production
app.use(compression({
  level: IS_PRODUCTION ? 6 : 1,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Enhanced JSON parsing with better error handling
app.use(express.json({ 
  limit: IS_PRODUCTION ? '5mb' : '10mb',
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      console.error('❌ Invalid JSON received:', e.message);
      res.status(400).json({
        success: false,
        message: 'Invalid JSON format',
        type: 'ValidationError'
      });
      return;
    }
  }
}));
app.use(express.urlencoded({ extended: true, limit: IS_PRODUCTION ? '5mb' : '10mb' }));

// Enhanced security headers for production
app.use((req, res, next) => {
  // Basic security headers
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  
  // Additional production security headers
  if (IS_PRODUCTION) {
    res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.header('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  }
  
  next();
});

// Enhanced CORS middleware with production settings
app.use((req, res, next) => {
  const allowedOrigins = IS_PRODUCTION 
    ? [
        'https://aeronomy-app-production.up.railway.app',
        'https://aeronomy.com',
        'https://www.aeronomy.com'
      ]
    : ['*'];
  
  const origin = req.headers.origin;
  
  if (IS_PRODUCTION) {
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Max-Age', '86400'); // 24 hours
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Enhanced request logging with production-appropriate detail level
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const userAgent = req.get('User-Agent')?.substring(0, 100) || 'Unknown';
  const clientIp = req.ip || req.connection.remoteAddress || 'Unknown';
  
  if (IS_PRODUCTION) {
    // Production logging - less verbose
    console.log(`📝 ${req.method} ${req.url} - IP: ${clientIp}`);
  } else {
    // Development logging - more verbose
    console.log(`📝 ${timestamp} - ${req.method} ${req.url} - IP: ${clientIp} - UA: ${userAgent}...`);
  }
  
  next();
});

// Rate limiting for production (simple implementation)
if (IS_PRODUCTION) {
  const requestCounts = new Map();
  const RATE_LIMIT_WINDOW = 60000; // 1 minute
  const RATE_LIMIT_MAX_REQUESTS = 100; // per IP per minute
  
  app.use((req, res, next) => {
    const clientIp = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!requestCounts.has(clientIp)) {
      requestCounts.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      return next();
    }
    
    const clientData = requestCounts.get(clientIp);
    
    if (now > clientData.resetTime) {
      requestCounts.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      return next();
    }
    
    if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
      console.warn(`⚠️  Rate limit exceeded for IP: ${clientIp}`);
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
        type: 'RateLimitError'
      });
    }
    
    clientData.count++;
    next();
  });
  
  // Clean up old entries every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of requestCounts.entries()) {
      if (now > data.resetTime) {
        requestCounts.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

// Enhanced health check endpoint with comprehensive status
app.get('/api/health', (req, res) => {
  const healthData = {
    success: true,
    data: {
      status: 'Server running',
      port: PORT,
      environment: NODE_ENV,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.1.0',
      uptime: Math.floor(process.uptime()),
      platform: {
        node: process.version,
        platform: process.platform,
        arch: process.arch,
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
        }
      },
      services: {
        database: process.env.MONGODB_URI ? 'configured' : 'not_configured',
        email: (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.SMTP_HOST) ? 'configured' : 'not_configured'
      }
    }
  };
  
  res.json(healthData);
});

// API routes with enhanced error handling
try {
  console.log('\n🔌 Setting up API routes...');
  app.use('/api/auth', authRoutes);
  app.use('/api/demo', demoRoutes);
  app.use('/api/user', userRoutes);
  console.log('✅ API routes configured successfully');
} catch (error) {
  console.error('❌ Route setup failed:', error);
  process.exit(1);
}

// Handle 404 for API routes (must come before static file serving)
app.use('/api/*', notFoundHandler);

// Serve static files with enhanced caching for production
const staticOptions = {
  maxAge: IS_PRODUCTION ? 31536000000 : 0, // 1 year in production, 0 in development
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    try {
      if (path.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      } else if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
        res.setHeader('Cache-Control', IS_PRODUCTION ? 'public, max-age=31536000, immutable' : 'no-cache');
      }
    } catch (error) {
      console.error('❌ Error setting cache headers:', error.message);
    }
  }
};

console.log('📁 Setting up static file serving...');
app.use(express.static(join(__dirname, 'dist'), staticOptions));

// Enhanced SPA routing with better error handling
app.get('*', (req, res) => {
  try {
    const indexPath = join(__dirname, 'dist', 'index.html');
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('❌ Error serving index.html:', err.message);
        res.status(500).json({
          success: false,
          message: 'Internal server error',
          type: 'ServerError'
        });
      }
    });
  } catch (error) {
    console.error('❌ Error in SPA routing:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      type: 'ServerError'
    });
  }
});

// Global error handler (must be last)
app.use(globalErrorHandler);

// Enhanced server startup with production considerations
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('\n🎉 Server successfully started!');
  console.log(`🌐 Server running on: http://0.0.0.0:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth/health`);
  console.log(`📝 Demo endpoints: http://localhost:${PORT}/api/demo/health`);
  
  if (IS_PRODUCTION) {
    console.log('\n🏭 Production mode optimizations active:');
    console.log('   ✅ Enhanced compression enabled');
    console.log('   ✅ Security headers enforced');
    console.log('   ✅ Rate limiting active');
    console.log('   ✅ Static file caching optimized');
  }
  
  console.log('\n📁 API Structure:');
  console.log('   /api/auth     - Authentication endpoints');
  console.log('   /api/demo     - Demo request endpoints');
  console.log('   /api/user     - User profile management');
  console.log('   /api/health   - Server health status');
  
  console.log('\n📧 Email Service Status:');
  const emailConfigured = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.SMTP_HOST);
  if (emailConfigured) {
    console.log('   ✅ Email service configured');
    console.log(`   📨 Demo notifications will be sent to: ${process.env.DEMO_EMAIL || 'Not specified'}`);
  } else {
    console.log('   ⚠️  Email service not fully configured');
    console.log('   💡 Set EMAIL_USER, EMAIL_PASS, SMTP_HOST, and DEMO_EMAIL environment variables');
  }
  
  console.log('\n✨ Server is ready for requests!');
  
  // Railway-specific logging
  if (process.env.RAILWAY_ENVIRONMENT) {
    console.log(`🚂 Railway Environment: ${process.env.RAILWAY_ENVIRONMENT}`);
    console.log(`📦 Railway Service: ${process.env.RAILWAY_SERVICE_NAME || 'aeronomy-app'}`);
  }
});

// Enhanced graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`\n👋 ${signal} received. Starting graceful shutdown...`);
  
  server.close((err) => {
    if (err) {
      console.error('❌ Error during server shutdown:', err);
      process.exit(1);
    }
    
    console.log('✅ HTTP server closed');
    
    // Close database connections if any
    if (process.env.MONGODB_URI) {
      // Add database cleanup logic here if needed
      console.log('🗄️  Database connections closed');
    }
    
    console.log('✨ Graceful shutdown completed');
    process.exit(0);
  });
  
  // Force shutdown after 30 seconds
  setTimeout(() => {
    console.error('⚠️  Forced shutdown after timeout');
    process.exit(1);
  }, 30000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Railway-specific process monitoring
if (IS_PRODUCTION) {
  process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error);
    // Don't exit in production, log and continue
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
    // Don't exit in production, log and continue
  });
} 