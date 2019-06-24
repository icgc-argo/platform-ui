FROM mhart/alpine-node:latest

WORKDIR /usr/src

COPY . .

RUN npm ci
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start-prod"]