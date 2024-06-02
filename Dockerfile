FROM node:20.11.0-alpine

ENV app /gymnase

WORKDIR $app

RUN apk add --update --no-cache git nodejs yarn build-base tzdata postgresql-dev postgresql-client imagemagick

COPY . $app

RUN npm install -g npm@10.8.1

RUN npm install -g nodemon

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "start"]
