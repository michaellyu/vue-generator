export default {
  path: ':article_id(\\d+)',
  component: resolve => require(['@/components/article/article-detail/ArticleDetail'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/components/article/article-detail/Index'], resolve)
    },
    {
      path: 'edit',
      component: resolve => require(['@/components/article/article-detail/Edit'], resolve)
    }
  ]
}
