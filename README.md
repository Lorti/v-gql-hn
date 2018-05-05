# v-gql-hn

> Hacker News w/ Vue.js and GraphQL

## Build Setup

### Graphcool

```bash
# install command line tool
npm install -g graphcool

# clone companion server project
git clone https://github.com/Lorti/v-gql-hn-graphcool
cd v-gql-hn-graphcool
npm install

# deploy companion server project
graphcool deploy

# manually copy `Simple API` URL to `src\apollo.js`
```

### Vue.js

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
