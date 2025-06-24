// MongoDB initialization script for Docker
db = db.getSiblingDB('aeronomy');

// Create user collection with proper indexes
db.createCollection('users');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "createdAt": 1 });
db.users.createIndex({ "lastLogin": 1 });

print('✅ Aeronomy database initialized successfully');
print('📁 Database: aeronomy');
print('📋 Collections: users');
print('🔍 Indexes: email (unique), createdAt, lastLogin'); 