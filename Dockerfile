FROM node:12-alpine as build

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn

COPY . .
RUN yarn build

FROM nginx:1.17.10-alpine

RUN apk add bash

COPY ./nginx/cmd.sh /etc/nginx/cmd.sh
COPY ./nginx/generate_env.sh /etc/nginx/generate_env.sh
COPY ./nginx/env.dict /etc/nginx/env.dict

COPY ./nginx/checkmoney.conf /etc/nginx/conf.d/

COPY --from=build /app/dist /usr/share/nginx/html
 
CMD ["bash", "/etc/nginx/cmd.sh"]
