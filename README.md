# v-gql-hn

> Hacker News w/ Vue.js and GraphQL

## Build Setup

### Graphcool

```bash
npm install -g graphcool

graphcool init v-gql-hn-graphcool

graphcool add-template graphcool/templates/auth/email-password

# edit `graphcool.yml` and `types.graphql` files

graphcool deploy

# copy `Simple API` URL to `src\apollo.js`
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
