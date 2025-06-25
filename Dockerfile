# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for building)
RUN npm ci

# Copy source code
COPY . .

# Build the frontend
RUN npm run build

# Remove devDependencies after building (optional optimization)
RUN npm prune --production

# Expose the port
EXPOSE 3004

# Start the application
CMD ["npm", "start"] 