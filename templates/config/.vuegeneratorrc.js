module.exports = {
  template: 'default',
  eslint: 'airbnb',
  router: {
    src: './router.yaml',
    dist: './src/router',
    componentsRoot: '@/components',
  },
  components: {
    src: './router.yaml',
    dist: './src/components',
    template: '',
    script: '',
    style: 'scss',
  },
};
