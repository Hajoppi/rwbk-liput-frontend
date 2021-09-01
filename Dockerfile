FROM node:12-alpine as builder

WORKDIR /app

ARG api_location=https://liput.rwbk.fi/api
ENV REACT_APP_API_LOCATION=$api_location

COPY package.json .
COPY package-lock.json .

RUN npm ci
COPY . .
RUN npm run build


FROM nginx:1.21.1-alpine
COPY --from=builder /app/build/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
