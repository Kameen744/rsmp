# Step 1: Use an official Node.js runtime as a parent image
FROM node:20-alpine AS build-stage

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY . .

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
# COPY . .

# Step 6: Build the Vue.js application
RUN npm run build

# Step 7: Use an official Nginx image to serve the built static files
FROM nginx:stable-alpine AS production-stage

# Step 8: Copy the built files from the build-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Step 9: Expose port 80 to the outside world
EXPOSE 80

# Step 10: Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
