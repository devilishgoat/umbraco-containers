FROM node:18-alpine

COPY package.json /app/package.json
WORKDIR /app
RUN npm install

COPY /src /app

CMD ["npx", "next", "dev"]