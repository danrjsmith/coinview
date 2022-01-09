FROM node:14.1-alpine AS builder

WORKDIR /opt/web
COPY app/package.json ./
RUN yarn
COPY ./app ./

RUN yarn build

ENV PATH="./node_modules/.bin:$PATH"

FROM nginx:1.17-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY ./nginx.conf /etc/nginx/nginx.template
COPY ./default.conf /etc/nginx/default.template
COPY --from=builder /opt/web/dist /usr/share/nginx/html
CMD envsubst < /etc/nginx/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'