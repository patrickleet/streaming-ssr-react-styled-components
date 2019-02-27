FROM node:11.10.0-alpine AS build

RUN apk add --update --no-cache \
    python \
    make \
    g++

COPY . /src
WORKDIR /src

RUN npm ci

RUN npm run format
RUN npm run build
RUN npm run test

RUN npm prune --production

FROM node:11.10.0-alpine

RUN apk add --update --no-cache curl

EXPOSE 1234

WORKDIR /usr/src/service

COPY --from=build /src/node_modules node_modules
COPY --from=build /src/dist dist

HEALTHCHECK --interval=5s \
            --timeout=5s \
            --retries=6 \
            CMD curl -fs http://localhost:1234/ || exit 1

USER node

CMD ["node", "./dist/server/index.js"]