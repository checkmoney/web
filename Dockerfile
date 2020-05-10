FROM mhart/alpine-node:10 as build

WORKDIR /app

COPY . .
RUN yarn

RUN yarn build

FROM keymetrics/pm2:10-alpine

WORKDIR /app

ENV NODE_ENV="production"
ENV PATH="./node_modules/.bin:$PATH"

COPY --from=build /app .

EXPOSE 3001

CMD [ "pm2-docker", "start", "pm2.json" ]