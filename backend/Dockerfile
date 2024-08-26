# Base image with Node.js 20
FROM node:20-alpine 

# Set working directory inside the container
WORKDIR /app

# Copy source code
COPY . .

# Install dependencies
RUN npm ci --only=production

# Compile TypeScript to JavaScript
# RUN npm run build # TODO

# Expose the port your backend app will run on (adjust if needed)
EXPOSE 3000 

# Start your backend app (adjust to your actual start script)
#CMD ["node", "build/index.js"]
CMD ["npm", "start"]