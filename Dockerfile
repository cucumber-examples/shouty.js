FROM node:6.9.4

VOLUME /shouty.js

WORKDIR /shouty.js

RUN npm install esprima

RUN npm install 
