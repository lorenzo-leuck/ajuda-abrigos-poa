FROM node:18

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

RUN npm run build

CMD ["npm", "run", "prod"]
