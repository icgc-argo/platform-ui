FROM node:alpine
WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./
RUN npm ci
COPY . .

RUN npx next build
CMD ["npx", "next", "start"]
