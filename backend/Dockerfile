FROM node:18

WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

EXPOSE 80

CMD [ "node", "src/server.js" ]

