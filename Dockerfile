# Use the official lightweight Nginx image based on Alpine Linux
FROM nginx:alpine

# Copy all the static website files into the default Nginx public directory
COPY . /usr/share/nginx/html

# Expose port 80 to allow external access to the container
EXPOSE 80