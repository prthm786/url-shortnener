FROM node:lts-alpine

WORKDIR /usr/src/url-shortener/

COPY . .

WORKDIR /usr/src/url-shortener/Server

RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]
