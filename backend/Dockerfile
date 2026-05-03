# Start from an official Node.js image (Alpine = lightweight Linux)
FROM node:20-alpine

# Set the working directory inside the container
# All following commands run from /app
WORKDIR /app

# Copy ONLY package files first (for better caching — explained below)
COPY package.json package-lock.json ./

# Install production dependencies only (no nodemon, etc.)
RUN npm ci --omit=dev

# Now copy the rest of your source code
COPY . .

# Tell Docker this container listens on port 8000
# (documentation only — doesn't actually publish the port)
EXPOSE 8000

# The command to run when the container starts
CMD ["node", "server.js"]
