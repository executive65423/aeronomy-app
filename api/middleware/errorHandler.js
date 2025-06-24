import fs from 'fs';
import path from 'path';

// Custom Error Classes
export class AppError extends Error {
  constructor(message, statusCode = 500, type = 'AppError') {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message, errors = []) {
    super(message, 400, 'ValidationError');
    this.errors = errors;
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401, 'AuthenticationError');
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Access denied') {
    super(message, 403, 'AuthorizationError');
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NotFoundError');
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource conflict') {
    super(message, 409, 'ConflictError');
  }
}

export class DatabaseError extends AppError {
  constructor(message = 'Database operation failed') {
    super(message, 503, 'DatabaseError');
  }
}

export class ExternalServiceError extends AppError {
  constructor(message = 'External service unavailable') {
    super(message, 503, 'ExternalServiceError');
  }
}

// Async Handler Wrapper
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Validation Helpers
export const validateRequired = (fields) => {
  const missing = [];
  
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null || value === '') {
      missing.push(key);
    }
  }
  
  if (missing.length > 0) {
    throw new ValidationError(`Missing required fields: ${missing.join(', ')}`);
  }
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email format');
  }
};

export const validatePassword = (password) => {
  if (password.length < 8) {
    throw new ValidationError('Password must be at least 8 characters long');
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    throw new ValidationError('Password must contain at least one lowercase letter');
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    throw new ValidationError('Password must contain at least one uppercase letter');
  }
  
  if (!/(?=.*\d)/.test(password)) {
    throw new ValidationError('Password must contain at least one number');
  }
};

// Error Logging
export const logError = (error, req = null) => {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    message: error.message,
    stack: error.stack,
    statusCode: error.statusCode || 500,
    type: error.type || 'UnknownError'
  };

  if (req) {
    errorInfo.method = req.method;
    errorInfo.url = req.url;
    errorInfo.ip = req.ip;
    errorInfo.userAgent = req.get('User-Agent');
  }

  // Log to console
  if (error.statusCode >= 500) {
    console.error('🚨 CRITICAL ERROR:', errorInfo);
  } else if (error.statusCode >= 400) {
    console.warn('⚠️  OPERATIONAL ERROR:', errorInfo);
  }

  // Log to file (optional)
  try {
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    const logFile = path.join(logDir, 'error.log');
    const logEntry = `${JSON.stringify(errorInfo)}\n`;
    fs.appendFileSync(logFile, logEntry);
  } catch (logError) {
    console.error('Failed to write error log:', logError);
  }
};

// Global Error Handler
export const globalErrorHandler = (err, req, res, next) => {
  // Log the error
  logError(err, req);

  // Handle specific error types
  if (err.name === 'CastError') {
    const message = `Invalid ${err.path}: ${err.value}`;
    err = new ValidationError(message);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} already exists`;
    err = new ConflictError(message);
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => val.message);
    err = new ValidationError('Validation failed', errors);
  }

  if (err.name === 'JsonWebTokenError') {
    err = new AuthenticationError('Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    err = new AuthenticationError('Token expired');
  }

  // Default to AppError if not already
  if (!(err instanceof AppError)) {
    err = new AppError(err.message || 'Something went wrong', err.statusCode || 500);
  }

  // Send error response
  const response = {
    success: false,
    message: err.message,
    type: err.type
  };

  // Include additional error details in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
    if (err.errors) {
      response.errors = err.errors;
    }
  }

  res.status(err.statusCode).json(response);
};

// 404 Handler
export const notFoundHandler = (req, res) => {
  const message = `Route ${req.originalUrl} not found`;
  res.status(404).json({
    success: false,
    message,
    type: 'NotFoundError'
  });
};

// Process Error Handlers
export const setupProcessErrorHandlers = () => {
  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err, promise) => {
    console.error('🚨 UNHANDLED PROMISE REJECTION:', err);
    logError(err);
    
    // Close server gracefully
    process.exit(1);
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error('🚨 UNCAUGHT EXCEPTION:', err);
    logError(err);
    
    // Close server gracefully
    process.exit(1);
  });

  // Handle SIGTERM
  process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received. Shutting down gracefully...');
    process.exit(0);
  });

  // Handle SIGINT (Ctrl+C)
  process.on('SIGINT', () => {
    console.log('👋 SIGINT received. Shutting down gracefully...');
    process.exit(0);
  });
}; 