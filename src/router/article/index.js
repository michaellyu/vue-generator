import articleDetail from './article-detail/index'

export default {
  path: '/article',
  component: resolve => require(['@/components/article/Article'], resolve),
  children: [
    {
      path: 'article-list',
      component: resolve => require(['@/components/article/ArticleList'], resolve)
    },
    articleDetail
  ]
}
