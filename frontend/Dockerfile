# ---------- Step 1: Build React App ----------
FROM node:18 AS build

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Always install ALL deps including devDependencies
RUN npm install --include=dev --legacy-peer-deps

# Disable ESLint plugin to avoid build-time conflicts
ENV DISABLE_ESLINT_PLUGIN=true

# Copy all source code
COPY . .

# Ensure react-scripts is available
RUN npx react-scripts build

# ---------- Step 2: Serve React App with Nginx ----------
FROM nginx:alpine

# Copy build output from previous stage
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
