# Use node image as base image
FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy all files to the container
COPY . .
# build the app
RUN npm run build 

# Expose the port your app runs on 
EXPOSE 3000

# Run the app
CMD [ "node", "dist/index.js" ]