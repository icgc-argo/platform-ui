FROM node:16.13.0-alpine

ENV APP_UID=9999
ENV APP_GID=9999
RUN apk --no-cache add shadow
RUN groupmod -g $APP_GID node 
RUN usermod -u $APP_UID -g $APP_GID node
RUN mkdir -p /appDir
WORKDIR /appDir
COPY . .
RUN chown -R node /appDir
USER node

RUN npm ci
RUN npm run build-uikit
RUN npm run graphql-codegen
RUN npx next build

EXPOSE 8080
CMD ["npx", "next", "start", "--", "-p", "8080"]
