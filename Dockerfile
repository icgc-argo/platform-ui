FROM node:alpine
WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./
RUN npm ci
COPY . .
RUN npx next build

EXPOSE 8080
CMD ["npx", "next", "start", "--", "-p", "8080"]
