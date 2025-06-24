# Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/aeronomy

# JWT Configuration  
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-make-it-long-and-random
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=3004

# Email Configuration (for future use)
# EMAIL_HOST=
# EMAIL_PORT=
# EMAIL_USER=
# EMAIL_PASS=
```

## Important Notes:

1. **JWT_SECRET**: Change this to a long, random string in production. You can generate one using:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **MONGODB_URI**: 
   - For local development: `mongodb://localhost:27017/aeronomy`
   - For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/aeronomy`

3. **Security**: Never commit the `.env` file to version control. It's already in `.gitignore`.

## MongoDB Setup:

### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use `mongodb://localhost:27017/aeronomy`

### Option 2: MongoDB Atlas (Cloud)
1. Create account at mongodb.com
2. Create a cluster
3. Get connection string
4. Replace in MONGODB_URI 