FROM node:lts-alpine

RUN apk --no-cache add curl

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY .npmrc .npmrc

RUN npm i --legacy-peer-deps

COPY  . .
CMD npm start
COPY .env .env

COPY tsconfig.json tsconfig.json
COPY public public
COPY codegen.yml codegen.yml
COPY src src

ARG REACT_APP_GRAPHQL_API_URL
ENV REACT_APP_GRAPHQL_API_URL ${REACT_APP_GRAPHQL_API_URL}

CMD npm start