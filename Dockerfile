FROM node:11

VOLUME /shouty.js

WORKDIR /shouty.js

RUN npm install
