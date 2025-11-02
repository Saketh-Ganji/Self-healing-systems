# Step 1: Build React app
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install --include=dev

# Copy rest of the project
COPY . .

# Build the app
RUN npx react-scripts build

# Step 2: Serve React app using Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
