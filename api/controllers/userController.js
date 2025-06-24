import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { 
  AppError, 
  ValidationError, 
  AuthenticationError, 
  AuthorizationError,
  NotFoundError,
  ConflictError,
  asyncHandler,
  validateRequired,
  validateEmail,
  validatePassword,
  logError
} from '../middleware/errorHandler.js';

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    throw new NotFoundError('User not found');
  }

  res.status(200).json({
    success: true,
    message: 'Profile retrieved successfully',
    data: {
      user
    }
  });
});

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, organizationName, role } = req.body;
  
  // Find user
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Validate fields if provided
  if (fullName !== undefined) {
    if (!fullName || fullName.trim().length === 0) {
      throw new ValidationError('Full name is required');
    }
    if (fullName.length > 100) {
      throw new ValidationError('Full name must be less than 100 characters');
    }
    user.fullName = fullName.trim();
  }

  if (organizationName !== undefined) {
    if (!organizationName || organizationName.trim().length === 0) {
      throw new ValidationError('Organization name is required');
    }
    if (organizationName.length > 100) {
      throw new ValidationError('Organization name must be less than 100 characters');
    }
    user.organizationName = organizationName.trim();
  }

  if (role !== undefined) {
    if (!role || role.trim().length === 0) {
      throw new ValidationError('Role is required');
    }
    if (role.length > 100) {
      throw new ValidationError('Role must be less than 100 characters');
    }
    user.role = role.trim();
  }

  await user.save();

  console.log(`✅ Profile updated: ${user.email}`);

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user
    }
  });
});

// @desc    Change password
// @route   PUT /api/user/change-password
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
  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isCurrentPasswordValid) {
    throw new AuthenticationError('Current password is incorrect');
  }

  // Hash new password
  const saltRounds = 12;
  user.password = await bcrypt.hash(newPassword, saltRounds);
  await user.save();

  console.log(`✅ Password changed: ${user.email}`);

  res.status(200).json({
    success: true,
    message: 'Password changed successfully'
  });
});

// @desc    Update user settings
// @route   PUT /api/user/settings
// @access  Private
export const updateSettings = asyncHandler(async (req, res) => {
  const { emailNotifications, marketingEmails, twoFactorAuth } = req.body;
  
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Update settings if provided
  if (emailNotifications !== undefined) {
    user.settings.emailNotifications = Boolean(emailNotifications);
  }

  if (marketingEmails !== undefined) {
    user.settings.marketingEmails = Boolean(marketingEmails);
  }

  if (twoFactorAuth !== undefined) {
    user.settings.twoFactorAuth = Boolean(twoFactorAuth);
  }

  await user.save();

  console.log(`✅ Settings updated: ${user.email}`);

  res.status(200).json({
    success: true,
    message: 'Settings updated successfully',
    data: {
      settings: user.settings
    }
  });
});

// @desc    Delete user account
// @route   DELETE /api/user/account
// @access  Private
export const deleteAccount = asyncHandler(async (req, res) => {
  const { password, confirmDeletion } = req.body;
  
  // Validate required fields
  validateRequired({ password, confirmDeletion });
  
  // Check confirmation
  if (confirmDeletion !== 'DELETE MY ACCOUNT') {
    throw new ValidationError('Please type "DELETE MY ACCOUNT" to confirm deletion');
  }

  // Find user with password
  const user = await User.findById(req.user.id).select('+password');
  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AuthenticationError('Password is incorrect');
  }

  // Delete user
  await User.findByIdAndDelete(req.user.id);

  console.log(`⚠️  Account deleted: ${user.email}`);

  res.status(200).json({
    success: true,
    message: 'Account deleted successfully'
  });
});

// @desc    Get all users (Admin only)
// @route   GET /api/user/admin/users
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  // Check if user is admin
  const currentUser = await User.findById(req.user.id);
  if (!currentUser || currentUser.role !== 'admin') {
    throw new AuthorizationError('Access denied. Admin privileges required.');
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Get users with pagination
  const users = await User.find({})
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalUsers = await User.countDocuments();
  const totalPages = Math.ceil(totalUsers / limit);

  res.status(200).json({
    success: true,
    message: 'Users retrieved successfully',
    data: {
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    }
  });
});

// @desc    Get user by ID (Admin only)
// @route   GET /api/user/admin/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  // Check if user is admin
  const currentUser = await User.findById(req.user.id);
  if (!currentUser || currentUser.role !== 'admin') {
    throw new AuthorizationError('Access denied. Admin privileges required.');
  }

  const user = await User.findById(req.params.id);
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

// @desc    Update user status (Admin only)
// @route   PUT /api/user/admin/users/:id/status
// @access  Private/Admin
export const updateUserStatus = asyncHandler(async (req, res) => {
  // Check if user is admin
  const currentUser = await User.findById(req.user.id);
  if (!currentUser || currentUser.role !== 'admin') {
    throw new AuthorizationError('Access denied. Admin privileges required.');
  }

  const { accountStatus } = req.body;
  
  // Validate status
  const validStatuses = ['active', 'suspended', 'deactivated'];
  if (!validStatuses.includes(accountStatus)) {
    throw new ValidationError('Invalid account status');
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Prevent admin from suspending themselves
  if (user._id.toString() === currentUser._id.toString() && accountStatus !== 'active') {
    throw new ValidationError('You cannot change your own account status');
  }

  user.accountStatus = accountStatus;
  await user.save();

  console.log(`✅ User status updated: ${user.email} -> ${accountStatus}`);

  res.status(200).json({
    success: true,
    message: 'User status updated successfully',
    data: {
      user
    }
  });
}); 