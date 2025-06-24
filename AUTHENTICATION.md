# Authentication System Documentation

## Overview

The aeronomy.info application now uses a robust MongoDB-based authentication system with JWT tokens and bcrypt password hashing. This replaces the previous in-memory user storage system.

## 🔧 Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory with:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/aeronomy

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=3004
```

### 2. Database Options

#### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use default URI: `mongodb://localhost:27017/aeronomy`

#### Option B: MongoDB Atlas (Recommended for Production)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

#### Option C: Development with Memory Server
- Automatically uses MongoDB Memory Server if no `MONGODB_URI` is set
- No installation required - works out of the box for development

## 🏗️ Architecture

### Database Schema

**User Model** (`api/models/User.js`):
```javascript
{
  fullName: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  organizationName: String (required),
  role: Enum ['Procurement Manager', 'Investor', 'Producer'],
  accountType: Enum ['Trial', 'Basic', 'Premium', 'Enterprise'],
  accountManager: String (default: 'Not assigned'),
  supportLevel: Enum ['Standard', 'Priority', 'Premium'],
  subscriptionPlan: Enum ['Trial', 'Basic', 'Premium', 'Enterprise'],
  subscriptionStatus: Enum ['Active', 'Inactive', 'Cancelled', 'Suspended'],
  nextBillingDate: Date,
  isEmailVerified: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Security Features

1. **Password Hashing**: bcrypt with salt rounds 12
2. **JWT Tokens**: 7-day expiration, secure secret
3. **Input Validation**: Mongoose schema validation
4. **Email Uniqueness**: Database-level unique constraint
5. **Case Insensitive Email**: Stored in lowercase
6. **Password Strength**: Minimum 8 characters

## 🔐 API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/signup`
Register a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "organizationName": "Acme Corp",
  "role": "Procurement Manager",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": { /* user object without password */ },
  "token": "jwt-token-here"
}
```

#### POST `/api/auth/login`
Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": { /* user object without password */ },
  "token": "jwt-token-here"
}
```

#### GET `/api/auth/me`
Get current user information (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "user": { /* user object without password */ }
}
```

#### POST `/api/auth/logout`
Logout user (optional endpoint for cleanup).

## 🎨 Frontend Integration

### Authentication Service (`src/lib/api.ts`)

The `AuthService` provides methods for:
- `signup(data)` - Register new user
- `login(data)` - Authenticate user
- `logout()` - Clear authentication
- `getCurrentUser()` - Get current user
- `isAuthenticated()` - Check auth status
- `getUser()` - Get stored user data

### Local Storage

Authentication data is stored in localStorage:
- `token` - JWT token
- `user` - User object (JSON)
- `isLoggedIn` - Boolean flag

### Protected Routes

Use the `authMiddleware` to protect API routes:

```javascript
import { authMiddleware } from './middleware/auth.js';

router.get('/protected', authMiddleware, (req, res) => {
  // Access user data via req.userData or req.user
  res.json({ message: 'Access granted', user: req.userData });
});
```

## 🧪 Testing

### Manual Testing

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Test registration:**
   ```bash
   curl -X POST http://localhost:3004/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{
       "fullName": "Test User",
       "email": "test@example.com",
       "organizationName": "Test Corp",
       "role": "Procurement Manager",
       "password": "password123",
       "confirmPassword": "password123"
     }'
   ```

3. **Test login:**
   ```bash
   curl -X POST http://localhost:3004/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "password123"
     }'
   ```

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **JWT Secret**: Use a strong, random secret in production
3. **HTTPS**: Always use HTTPS in production
4. **Password Policy**: Consider implementing stronger password requirements
5. **Rate Limiting**: Add rate limiting to prevent brute force attacks
6. **Input Sanitization**: All inputs are validated and sanitized

## 🚀 Production Deployment

1. Set strong `JWT_SECRET`
2. Use MongoDB Atlas or secure MongoDB instance
3. Enable HTTPS
4. Set up monitoring and logging
5. Configure proper CORS settings
6. Add rate limiting middleware
7. Set up backup strategies

## 🔄 Migration from In-Memory Storage

The system has been completely migrated from in-memory user storage to MongoDB:

- ✅ Removed in-memory `users` array
- ✅ Added MongoDB User model
- ✅ Updated all authentication endpoints
- ✅ Enhanced error handling
- ✅ Added proper validation
- ✅ Improved security measures

## 📝 Error Handling

The system provides comprehensive error handling:

- **Validation Errors**: Field-specific validation messages
- **Authentication Errors**: Clear error messages without exposing sensitive info
- **Database Errors**: Proper error handling for connection issues
- **Network Errors**: Client-side network error handling

## 🛠️ Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check if MongoDB is running
   - Verify connection string
   - Check network connectivity

2. **JWT Token Invalid**
   - Check if JWT_SECRET matches
   - Verify token expiration
   - Clear browser localStorage

3. **User Already Exists**
   - Email addresses must be unique
   - Check for typos in email

4. **Validation Errors**
   - Ensure all required fields are provided
   - Check password length (minimum 8 characters)
   - Verify role is from allowed enum values

This authentication system provides a secure, scalable foundation for user management in the aeronomy.info application. 