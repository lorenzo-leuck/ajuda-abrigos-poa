FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --no-optional --force

COPY . .

EXPOSE 5174

RUN npm run build

CMD [ "npm", "run", "dev" ]
