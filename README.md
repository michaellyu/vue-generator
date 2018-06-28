Vue Generator
=============

Code generator for the Vue project.

### Installation

```bash
yarn global add vue-generator-cli
// or
npm i -g vue-generator-cli
```

### Usage

```shell
# init router.yaml and .vuegeneratorrc.js
vue-generator init
# edit router.yaml and .vuegeneratorrc.js
# create router and compoents
vue-generator all
# edit router.yaml and .vuegeneratorrc.js
# update components
vue-generator components -f
# edit router.yaml and .vuegeneratorrc.js
# update router
vue-generator router -f
```

### Configuration

.vuegeneratorrc.js

```javascript
module.exports = {
  template: 'default', // default template
  eslint: 'airbnb',  // eslint style
  router: { // router config path
    src: './router.yaml', // router config path
    dist: './src/router', // output router path
    componentsRoot: '@/components' // components root path
  },
  components: { // components config
    src: './router.yaml', // components config path(same as router config)
    dist: './src/compoents', // output components path
    template: '', // template lang
    script: '', // script lang
    style: 'scss', // style lang
  },
};
```

router.yaml

```yaml
---
  router: # root
    - index # index component & /index route
    - account: # router-view component & /account route
      - login # login component & /account/login route
    - article: # router-view component & /article route
      - article-list # article-list component & /article/article-list route
      - name: article-detail # component name
        path: ":article_id(\\d+)" # /article/(\d+) route path
        children: # children of route
          - index # index component & /article/(\d+)/index route
          - edit # edit component & /article/(\d+)/edit route
```

### Result

```shell
src
├── App.vue
├── assets
│   └── logo.png
├── components
│   ├── Index.vue
│   ├── account
│   │   ├── Account.vue
│   │   └── Login.vue
│   └── article
│       ├── Article.vue
│       ├── ArticleList.vue
│       └── article-detail
│           ├── ArticleDetail.vue
│           ├── Edit.vue
│           └── Index.vue
├── main.js
└── router
    ├── account
    │   └── index.js
    ├── article
    │   ├── article-detail
    │   │   └── index.js
    │   └── index.js
    └── index.js
```
