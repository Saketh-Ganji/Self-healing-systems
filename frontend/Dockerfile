# ---------- Step 1: Build React App ----------
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json files first
COPY package*.json ./

# Force install react-scripts explicitly to guarantee availability
RUN npm install react-scripts@5.0.1 --save-dev --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copy all source files
COPY . .

# Build the app
RUN npm run build

# ---------- Step 2: Serve React App using Nginx ----------
FROM nginx:alpine

# Copy the React build from previous step
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
