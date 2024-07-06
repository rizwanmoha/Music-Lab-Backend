FROM node:18-alpine

WORKDIR /backend

COPY package*.json .

RUN npm install -f

COPY . .

EXPOSE 8000

CMD ["npm", "run", "start"]