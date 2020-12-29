# The base go-image
FROM golang:1.14-alpine
 
# Create a directory for the app
RUN mkdir /app
 
# Copy all files from the current directory to the app directory
COPY . /app
 
# Set working directory
WORKDIR /app/web-maker-server

ENV WEB_MAKER_ROOT /app/
# Run command as described:
# go build will build an executable file named server in the current directory
WORKDIR /app/web-maker
RUN go build httpd 
 
# Run the server executable
CMD [ "/app/web-maker-server/httpd" ]

EXPOSE 5000
