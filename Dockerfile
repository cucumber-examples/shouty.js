FROM node:8.4.0

USER node

VOLUME /shouty.js

WORKDIR /shouty.js

RUN npm install
