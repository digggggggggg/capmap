# Base image with Node.js 20
FROM node:20-alpine 

# Set working directory inside the container
WORKDIR /app

# Copy source code
COPY . .

# Install dependencies
RUN npm ci
# RUN npm ci --only=production -- see https://github.com/remix-run/remix/issues/205

# Build app
RUN npm run build

# Expose the port your Remix.js app will run on (usually 3000)
EXPOSE 3000

# Start your Remix.js app
CMD ["npm", "run", "start"] 