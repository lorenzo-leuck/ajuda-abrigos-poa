FROM node:18

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 80 443

RUN npm run build

CMD ["npm", "run", "prod"]
