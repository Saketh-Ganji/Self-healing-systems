# ---------- Step 1: Build React App ----------
FROM node:18 AS build

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies (includes react-scripts)
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Build React app
RUN npm run build

# ---------- Step 2: Serve with Nginx ----------
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
