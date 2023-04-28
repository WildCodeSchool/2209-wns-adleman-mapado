FROM node:lts-alpine
<<<<<<< HEAD

RUN apk --no-cache add curl
RUN apk add make g++ python3 git
RUN npm i -g node-pre-gyp

=======
RUN apk --no-cache add curl
>>>>>>> origin
RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm i --legacy-peer-deps


COPY tsconfig.json tsconfig.json
COPY src src
COPY .env .env

CMD npm start
