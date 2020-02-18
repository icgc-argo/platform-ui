FROM node:12.13.1-alpine

RUN mkdir -p /appDir
RUN chown -R node /appDir
USER node
WORKDIR /appDir

COPY . .
RUN npm ci
RUN npx next build

EXPOSE 8080
USER 1000
CMD ["npx", "next", "start", "--", "-p", "8080"]
