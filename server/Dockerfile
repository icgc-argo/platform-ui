FROM mhart/alpine-node:latest

WORKDIR /usr/src

COPY . .

RUN npm install pm2 -g
RUN npm ci

CMD ["pm2-runtime", "index.js"]