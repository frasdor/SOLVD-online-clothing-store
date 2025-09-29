# 1. Choose the official Node.js image
FROM node:20

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy package.json and package-lock.json
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the application code
COPY . .

# 6. Expose the port that the backend will run on
EXPOSE 3000

# 7. Default command to start the backend
CMD ["npm", "start"]
