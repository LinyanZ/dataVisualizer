FROM node:lts-alpine
# ENV NODE_ENV=production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# EXPOSE 5000
# RUN chown -R node /usr/src/app
# USER node
# CMD ["npm", "rum", "dev"]


WORKDIR /frontend
COPY package.json .
RUN npm i
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]