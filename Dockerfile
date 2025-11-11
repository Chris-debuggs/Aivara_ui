
# --- Build Stage ---
FROM node:18-alpine as builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json bun.lockb ./ # Assuming bun.lockb exists for bun install
# Use npm install as a fallback or if bun is not the primary package manager
# First, check if bun.lockb exists and try bun, otherwise fall back to npm
RUN if [ -f "bun.lockb" ]; then     npm install -g bun;     bun install; else     npm install; fi

# Copy the rest of the application code
COPY . .

# Build the frontend application
RUN if [ -f "bun.lockb" ]; then     bun run build; else     npm run build; fi

# --- Serve Stage ---
FROM nginx:alpine

# Install 'bash' to enable conditional logic in entrypoint scripts if needed
RUN apk add --no-cache bash

# Copy custom nginx configuration (if any)
# For a SPA, this typically involves routing all requests to index.html
# You might need to create a custom nginx.conf in your project root.
# For now, let's assume default config and handle SPA routing via try_files in a custom config.
# COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf .

# Copy built assets from the build stage
COPY --from=builder /app/dist .

# Copy the Nginx default configuration that handles SPA routing
# This is a common configuration for SPAs to ensure client-side routing works
COPY --from=builder /app/nginx-spa.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
