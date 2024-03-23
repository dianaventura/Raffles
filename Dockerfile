
FROM node:latest

WORKDIR /usr/src/app

# Assuming your package.json is at the project root
COPY package*.json ./
RUN npm install --only=production

# copy frontend to container
COPY ./frontend ./frontend

EXPOSE 8080

# Adjust the CMD to run your server file from its location within the container
CMD [ "node", "./frontend/controllers/simpleServer.js" ]
