FROM node:22-alpine

WORKDIR /app
RUN apk add --no-cache openssl

COPY package*.json .
COPY /prisma ./prisma

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm","run","dev"]
