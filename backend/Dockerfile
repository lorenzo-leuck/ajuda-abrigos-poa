FROM node:14

WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

EXPOSE 1339

CMD [ "node", "src/server.js" ]

