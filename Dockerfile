FROM node:11

USER node

VOLUME /shouty.js

WORKDIR /shouty.js

RUN npm install
