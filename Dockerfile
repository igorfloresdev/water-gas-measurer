FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

RUN npx prisma generate
RUN npx prisma migrate deploy
RUN mkdir /usr/src/app/build

RUN npm run build
EXPOSE 3333

CMD [ "npm", "start" ]
