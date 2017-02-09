FROM node:7.5.0

VOLUME /shouty.js

WORKDIR /shouty.js

RUN npm install
