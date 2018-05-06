import Vue from 'vue';
import Router from 'vue-router';
import account from './account/index';
import article from './article/index';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/index',
      component: resolve => require(['@/components/Index'], resolve),
    },
    account,
    article,
  ],
});
