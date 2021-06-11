FROM node:12 as builder

WORKDIR /app


COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .


RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/build/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
