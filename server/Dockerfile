FROM node:lts-alpine
RUN apk --no-cache add curl
RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm i --legacy-peer-deps

RUN apk --no-cache add curl
RUN apk add make g++ python3 git
RUN npm i -g node-pre-gyp
COPY tsconfig.json tsconfig.json
COPY src src
COPY .env .env

CMD npm start
