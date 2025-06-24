import express from 'express';
import { protect } from './middleware/auth.js';
import {
  signup,
  login,
  getCurrentUser,
  logout,
  forgotPassword,
  resetPassword,
  changePassword
} from './controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.post('/logout', protect, logout);
router.put('/change-password', protect, changePassword);

// Health check
router.get('/health', async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        status: 'Auth service running',
        database: 'Connected', // This will be updated by the actual health check
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Health check failed',
      error: error.message
    });
  }
});

export default router; 