FROM node:12.13.1-alpine

ENV APP_UID=9999
ENV APP_GID=9999
RUN apk --no-cache add shadow
RUN groupmod -g $APP_GID node 
RUN usermod -u $APP_UID -g $APP_GID node
RUN mkdir -p /appDir
RUN chown -R node /appDir
WORKDIR /appDir

COPY . .
RUN npm ci
RUN npx next build
USER node

EXPOSE 8080
CMD ["npx", "next", "start", "--", "-p", "8080"]
