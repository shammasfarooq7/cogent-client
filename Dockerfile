FROM node:18-alpine as build-stage

ARG REACT_APP_COMMIT_SHA
ENV REACT_APP_COMMIT_SHA=$REACT_APP_COMMIT_SHA

WORKDIR /app

COPY package.json /app/

RUN npm

COPY ./ /app/

RUN npm build

FROM nginx:1.13-alpine

RUN apk add --no-cache bash

COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/env.sh /usr/share/nginx/html
COPY --from=build-stage /app/.runtime_env /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN chmod +x env.sh

EXPOSE 80

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]