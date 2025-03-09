# Use a Node.js Alpine base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code
COPY . .

# Expose the port your Express app will listen on
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]