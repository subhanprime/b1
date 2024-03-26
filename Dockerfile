# Use the official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install


COPY .env .
# Copy the rest of the application code
COPY . .

# Expose the port specified in the environment variable or default to 5001
EXPOSE 5002

# Command to run your application
CMD ["npm", "start"]
