# ---------- Step 1: Build React App ----------
FROM node:18 AS build

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies with devDeps
RUN npm install --include=dev --legacy-peer-deps

# Disable ESLint during build (avoids CRA plugin conflicts)
ENV DISABLE_ESLINT_PLUGIN=true

# Copy all source files
COPY . .

# Build React app
RUN npm run build

# ---------- Step 2: Serve React App using Nginx ----------
FROM nginx:alpine

# Copy React build output to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
