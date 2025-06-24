import express from 'express';
import { protect } from './middleware/auth.js';
import {
  getProfile,
  updateProfile,
  changePassword,
  updateSettings,
  deleteAccount,
  getAllUsers,
  getUserById,
  updateUserStatus
} from './controllers/userController.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Password and settings
router.put('/change-password', changePassword);
router.put('/settings', updateSettings);

// Account management
router.delete('/account', deleteAccount);

// Admin routes
router.get('/admin/users', getAllUsers);
router.get('/admin/users/:id', getUserById);
router.put('/admin/users/:id/status', updateUserStatus);

export default router; 