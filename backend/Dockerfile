FROM node:18 as base

FROM base as development
WORKDIR /app
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}
COPY package*.json ./
RUN npm install
COPY . .
COPY .env .env
EXPOSE 1339
CMD [ "node", "src/server.js" ]


FROM base as production
WORKDIR /backend
COPY ./backend/package*.json .
RUN npm i --omit-dev
COPY ./backend .
WORKDIR /backend/src/frontend
COPY ./frontend/package*.json .
RUN npm i
COPY ./frontend .
RUN npm run build
WORKDIR /backend
CMD [ "node", "src/server.js" ]
