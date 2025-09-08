FROM node:22-alpine as base

WORKDIR /app
RUN apk add --no-cache openssl

COPY package*.json .
COPY /prisma ./prisma

RUN npm install

COPY . .

#dev
FROM base as dev
EXPOSE 8080
CMD ["npm","run","dev"]

#build
FROM base as build
RUN npm run build


