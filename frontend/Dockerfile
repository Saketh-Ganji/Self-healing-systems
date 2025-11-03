# ---------- Step 1: Build React App ----------
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm install --include=dev --legacy-peer-deps

# Force ensure react-scripts exists
RUN npx react-scripts --version || npm install react-scripts@5.0.1 --save-dev --legacy-peer-deps

# Copy all app source files
COPY . .

# Build the React app
RUN npx react-scripts build

# ---------- Step 2: Serve React App using Nginx ----------
FROM nginx:alpine

# Copy build files to Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
