FROM mhart/alpine-node:latest

WORKDIR /usr/src

COPY . .

RUN npm ci

EXPOSE 9000

CMD ["node", "index.js"]