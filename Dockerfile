FROM node as builder

RUN mkdir -p /app/server
WORKDIR /app/server

COPY package.json /app/server


# 准备 bcrypt 环境
RUN yarn add node-gyp node-pre-gyp


RUN yarn

COPY . /app/server

RUN yarn build

FROM node

RUN mkdir -p /app/server
WORKDIR /app/server

COPY --from=builder /app/server /app/server

CMD ["node","dist/main.js"]
