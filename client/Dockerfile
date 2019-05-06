FROM mhart/alpine-node:latest

WORKDIR /usr/src

COPY . .

RUN npm ci

EXPOSE 8080

CMD ["node", "index.js"]