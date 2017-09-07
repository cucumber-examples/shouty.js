FROM node:8.4.0

VOLUME /shouty.js

WORKDIR /shouty.js

RUN npm install
