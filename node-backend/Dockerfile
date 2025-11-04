# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
