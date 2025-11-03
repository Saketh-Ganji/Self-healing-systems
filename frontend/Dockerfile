# ---------- Step 1: Build React App ----------
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies (including devDependencies)
COPY package*.json ./

# Install both normal and dev dependencies
RUN npm install --legacy-peer-deps

# Copy all app files
COPY . .

# Build React app (react-scripts will now be available)
RUN npm run build

# ---------- Step 2: Serve with Nginx ----------
FROM nginx:alpine

# Copy build folder from previous step
COPY --from=build /app/build /usr/share/nginx/html

# Expose and run
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
