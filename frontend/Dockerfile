FROM node:18

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5174

RUN npm run build

CMD ["npm", "run", "dev"]
