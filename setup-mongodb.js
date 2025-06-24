#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🍃 MongoDB Setup Helper for Aeronomy.info\n');

console.log('Choose your MongoDB setup option:\n');

console.log('🚀 OPTION 1: MongoDB Atlas (Recommended - Free & Easy)');
console.log('   ✅ No local installation required');
console.log('   ✅ Free tier available (512MB)');
console.log('   ✅ Works immediately');
console.log('   ✅ Cloud hosted and managed');
console.log('');
console.log('   Steps:');
console.log('   1. Go to: https://www.mongodb.com/atlas');
console.log('   2. Click "Start Free" and create account');
console.log('   3. Create a cluster (choose free tier)');
console.log('   4. Create database user (remember username/password)');
console.log('   5. Add your IP to whitelist (or 0.0.0.0/0 for development)');
console.log('   6. Get connection string (looks like mongodb+srv://...)');
console.log('   7. Create .env file with your connection string');
console.log('');

console.log('🔧 OPTION 2: Local MongoDB Installation');
console.log('   • Windows: https://www.mongodb.com/try/download/community');
console.log('   • macOS: brew install mongodb/brew/mongodb-community');
console.log('   • Linux: sudo apt install mongodb or use package manager');
console.log('');

console.log('⚡ OPTION 3: Docker (If you have Docker installed)');
console.log('   Run: docker run -d -p 27017:27017 --name mongodb mongo:6.0');
console.log('');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('✅ .env file already exists');
  
  // Read and check if MONGODB_URI is set
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('MONGODB_URI=') && !envContent.includes('MONGODB_URI=mongodb://localhost:27017/aeronomy')) {
    console.log('✅ MongoDB URI appears to be configured');
    console.log('\n🎉 Try running: npm start');
  } else {
    console.log('⚠️  MongoDB URI not configured in .env file');
    showEnvExample();
  }
} else {
  console.log('📝 No .env file found. Creating example...');
  createEnvExample();
}

function showEnvExample() {
  console.log('\n📝 Your .env file should look like this:');
  console.log('');
  console.log('# For MongoDB Atlas:');
  console.log('MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aeronomy');
  console.log('');
  console.log('# OR for local MongoDB:');
  console.log('MONGODB_URI=mongodb://localhost:27017/aeronomy');
  console.log('');
  console.log('JWT_SECRET=your-super-secret-jwt-key-change-this-in-production');
  console.log('JWT_EXPIRES_IN=7d');
  console.log('PORT=3004');
}

function createEnvExample() {
  const envContent = `# MongoDB Configuration
# Choose ONE of the options below:

# Option 1: MongoDB Atlas (Recommended)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aeronomy

# Option 2: Local MongoDB (uncomment the line below)
# MONGODB_URI=mongodb://localhost:27017/aeronomy

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Server Configuration  
PORT=3004

# Email Configuration (for future use)
# EMAIL_HOST=
# EMAIL_PORT=
# EMAIL_USER=
# EMAIL_PASS=
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file with examples');
  console.log('📝 Edit the .env file and uncomment your preferred MongoDB option');
}

console.log('\n🔗 Useful Links:');
console.log('   • MongoDB Atlas: https://www.mongodb.com/atlas');
console.log('   • MongoDB Community: https://www.mongodb.com/try/download/community');
console.log('   • MongoDB Compass (GUI): https://www.mongodb.com/products/compass');
console.log('');
console.log('💡 Need help? Check AUTHENTICATION.md for detailed instructions');
console.log('');
console.log('🚀 Once configured, run: npm start'); 