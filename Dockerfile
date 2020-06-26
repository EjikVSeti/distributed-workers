FROM node:14-alpine

WORKDIR /usr/src/app

CMD apk install bash && apk add npm

COPY ./ /usr/src/app

COPY config /usr/src/app/

RUN npm install

ENV NODE_ENV=docker

