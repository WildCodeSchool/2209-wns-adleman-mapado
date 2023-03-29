FROM node:lts-alpine
RUN apk --no-cache add curl
RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm i --legacy-peer-deps


COPY tsconfig.json tsconfig.json
COPY src src
COPY .env .env

CMD npm start
