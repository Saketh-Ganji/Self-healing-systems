# ---------- Step 1: Build React App ----------
FROM node:18 AS build

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies (include devDeps)
RUN npm install --include=dev --legacy-peer-deps

# Explicitly install react-scripts globally to avoid path issues
RUN npm install -g react-scripts@5.0.1

# Copy source files
COPY . .

# Build React app
RUN npm run build

# ---------- Step 2: Serve React App using Nginx ----------
FROM nginx:alpine

# Copy build output to Nginx's default static directory
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
