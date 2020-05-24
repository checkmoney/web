FROM node:12-alpine as build

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn

COPY . .
RUN yarn build

FROM nginx:1.17.10-alpine

COPY ./nginx/checkmoney.conf /etc/nginx/conf.d/

COPY --from=build /app/dist /usr/share/nginx/html