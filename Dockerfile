FROM node:12

WORKDIR /usr/src/app

RUN apt-get update

RUN npm install -g http-server

COPY ./dist .

EXPOSE 3000
CMD [ "http-server", "-p", "3000" ]