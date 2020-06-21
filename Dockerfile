FROM node:12-alpine as build

WORKDIR /app

COPY . .
RUN yarn build

FROM nginx:1.16.1-alpine

RUN apk add bash

COPY ./nginx/cmd.sh /etc/nginx/cmd.sh
COPY ./nginx/generate_env.sh /etc/nginx/generate_env.sh
COPY ./nginx/env.dict /etc/nginx/env.dict

COPY ./nginx/checkmoney.conf /etc/nginx/conf.d/

COPY --from=build /app/dist /srv/www
 
CMD ["bash", "/etc/nginx/cmd.sh"]
