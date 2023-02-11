FROM node:lts-alpine

RUN npm install -g nodemon

WORKDIR /backend
COPY package.json .
RUN npm i
COPY . .
EXPOSE 3000
CMD ["nodemon", "index.js"]
