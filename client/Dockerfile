FROM node:lts-alpine

RUN apk --no-cache add curl

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i --legacy-peer-deps

COPY  . .
CMD npm start
COPY .env .env