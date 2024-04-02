
FROM node:latest

WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install --only=production

# copy frontend to container
COPY ./frontend ./frontend

COPY ./models ./models
COPY ./routes ./routes
COPY ./controllers ./controllers
COPY ./simpleServer.js ./
COPY ./cron.js ./

EXPOSE 8080

# run server from inside container
CMD [ "node", "simpleServer.js" ]
