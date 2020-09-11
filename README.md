# shiramine-frontend

> My world-class Nuxt.js project

## dockerを使う際の設定

```bash
# npmコマンドが使える状態で
npm install
npm run build
docker build -t shiramine-frontend .
docker run -d -p 3000:3000 shiramine-frontend
```

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
