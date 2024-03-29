# Use a base image that includes the required dependencies for your backend application
FROM node:14

# Install the MySQL client package
# RUN apt-get update && apt-get install -y mysql-client

# Set the working directory in the container
WORKDIR /backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend application code to the working directory
COPY . .

# Expose the port on which the backend application will run
EXPOSE 8082

# Command to run the backend application
CMD ["node", "server.js"]
