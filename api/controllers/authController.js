import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { 
  AppError, 
  ValidationError, 
  AuthenticationError, 
  ConflictError,
  NotFoundError,
  asyncHandler,
  validateRequired,
  validateEmail,
  validatePassword,
  logError
} from '../middleware/errorHandler.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = asyncHandler(async (req, res) => {
  const { fullName, email, organizationName, role, password, confirmPassword } = req.body;
  
  // Validate required fields
  validateRequired({ fullName, email, organizationName, role, password, confirmPassword });
  
  // Validate email format
  validateEmail(email);
  
  // Validate password
  validatePassword(password);
  
  // Check if passwords match
  if (password !== confirmPassword) {
    throw new ValidationError('Passwords do not match');
  }
  
  // Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ConflictError('User with this email already exists');
  }
  
  // Create user
  const user = await User.create({
    fullName: fullName.trim(),
    email: email.toLowerCase().trim(),
    organizationName: organizationName.trim(),
    role: role.trim(),
    password // Will be hashed by the User model pre-save hook
  });
  
  // Generate token
  const token = generateToken(user._id);
  
  // Update last login
  await user.updateLastLogin();
  
  console.log(`✅ User registered: ${user.email}`);
  
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user,
      token
    }
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  // Validate required fields
  validateRequired({ email, password });
  
  // Validate email format
  validateEmail(email);
  
  // Find user with password
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) {
    throw new AuthenticationError('Invalid email or password');
  }
  
  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new AuthenticationError('Invalid email or password');
  }
  
  // Generate token
  const token = generateToken(user._id);
  
  // Update last login
  await user.updateLastLogin();
  
  console.log(`✅ User logged in: ${user.email}`);
  
  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user,
      token
    }
  });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  res.status(200).json({
    success: true,
    message: 'User retrieved successfully',
    data: {
      user
    }
  });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  // Note: With JWT, logout is mainly handled client-side by removing the token
  // This endpoint can be used for logging/cleanup if needed
  
  console.log(`✅ User logged out: ${req.user.email}`);
  
  res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  
  // Validate required fields
  validateRequired({ currentPassword, newPassword, confirmNewPassword });
  
  // Validate new password
  validatePassword(newPassword);
  
  // Check if new passwords match
  if (newPassword !== confirmNewPassword) {
    throw new ValidationError('New passwords do not match');
  }
  
  // Check if new password is different from current
  if (currentPassword === newPassword) {
    throw new ValidationError('New password must be different from current password');
  }
  
  // Find user with password
  const user = await User.findById(req.user.id).select('+password');
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  // Verify current password
  const isCurrentPasswordValid = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordValid) {
    throw new AuthenticationError('Current password is incorrect');
  }
  
  // Update password
  user.password = newPassword; // Will be hashed by the User model pre-save hook
  await user.save();
  
  console.log(`✅ Password changed for: ${user.email}`);
  
  res.status(200).json({
    success: true,
    message: 'Password changed successfully'
  });
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  // Validate email
  validateRequired({ email });
  validateEmail(email);
  
  // For now, just return success (implement email functionality later)
  console.log(`🔄 Password reset requested for: ${email}`);
  
  res.status(200).json({
    success: true,
    message: 'Password reset instructions sent to email'
  });
});

// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  const { newPassword, confirmNewPassword } = req.body;
  const { token } = req.params;
  
  // Validate required fields
  validateRequired({ newPassword, confirmNewPassword, token });
  
  // Validate password
  validatePassword(newPassword);
  
  // Check if passwords match
  if (newPassword !== confirmNewPassword) {
    throw new ValidationError('Passwords do not match');
  }
  
  // For now, just return success (implement token verification later)
  console.log(`🔄 Password reset attempted with token: ${token.substring(0, 10)}...`);
  
  res.status(200).json({
    success: true,
    message: 'Password reset successful'
  });
}); 