FROM node:18

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 443 5175

RUN npm run build

CMD ["npm", "run", "prod"]
