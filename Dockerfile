FROM node:20.11.0-alpine

ENV app /gymnase

WORKDIR $app

RUN apk add --update --no-cache git=2.43.0 nodejs=20.11.0 build-base=0.5-r3 postgresql-dev=15 postgresql-client=15 imagemagick=7.1.1-33

COPY . $app

RUN npm install -g npm@10.8.1 nodemon && npm install

EXPOSE 5000

CMD ["npm", "run", "start"]
