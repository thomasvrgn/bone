FROM node:12-alpine AS BUILD_IMAGE

WORKDIR /usr/src/app

COPY src src
COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY sample sample

RUN mkdir dist
RUN npm i --save
RUN npm run build

RUN rm -rf ./node_modules/
RUN rm -rf ./src/
RUN rm -rf package.json
RUN rm -rf tsconfig.json

FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/sample ./sample

CMD [ "node", "./dist/index.js" ]