export default {
  path: '/account',
  component: resolve => require(['@/components/account/Account'], resolve),
  children: [
    {
      path: 'login',
      component: resolve => require(['@/components/account/Login'], resolve)
    }
  ]
}
