const program = require('commander');
const template = require('art-template');
const utils = require('../utils/index.js');
const root = utils.resolve(process.cwd());
const baseConfig = require(utils.resolve(root, './.vuegeneratorrc.js'));

module.exports = {
  run,
};

function run(force) {
  const config = getConfig();
  const router = getRouter(config);
  writeRouter(router, config, force);
}

function getConfig() {
  if (!baseConfig.router) {
    throw new Error('Not found router in .vuegeneratorrc.js');
  }
  if (!baseConfig.router.src) {
    throw new Error('Not found router src in .vuegeneratorrc.js');
  }
  if (!baseConfig.router.dist) {
    throw new Error('Not found router dist in .vuegeneratorrc.js');
  }
  if (!baseConfig.router.componentsRoot) {
    throw new Error('Not found router componentsRoot in .vuegeneratorrc.js');
  }
  const config = baseConfig.router;
  config.eslint = baseConfig.eslint;
  config.src = utils.resolve(root, config.src);
  config.dist = utils.resolve(root, utils.fixdir(config.dist));
  config.componentsRoot = utils.fixdir(config.componentsRoot);
  return config;
}

function getRouter(config) {
  let routerData = utils.loadYaml(config.src);
  if (routerData.router) {
    routerData = routerData.router;
  }
  const router = {
    eslint: config.eslint,
    routers: [],
  };
  fillRouterChildren(routerData, null, router.routers)
  return router;

  function fillRouterChildren(routerData, parent, routerChildren) {
    routerData.forEach((item) => {
      if (utils.isString(item)) {
        routerChildren.push(makeRouter(parent, item, item));
      } else if (utils.isObject(item)) {
        const keys = Object.keys(item);
        if (keys.length === 1 && item[keys[0]].length) {
          keys.forEach((key) => {
            var router = makeRouter(parent, key, key, true);
            fillRouterChildren(item[key], router, router.children);
            routerChildren.push(router);
          });
        } else if (keys.length > 1 && item['name'] && item['path']) {
          const router = makeRouter(parent, item['name'], item['path'], item['children']);
          if (router.children) {
            fillRouterChildren(item.children, router, router.children);
          }
          routerChildren.push(router);
        }
      }
    });
  }

  function makeRouter(parent, name, path, hasChildren) {
    const router = {
      eslint: config.eslint,
      name: utils.camelize(name),
      path: `${parent ? '' : '/'}${utils.hyphenate(path)}`,
      dir: utils.hyphenate(name),
      fulldir: `${parent ? parent.fulldir + '/' : ''}${utils.hyphenate(name)}`,
      component: `${config.componentsRoot
        || '@/components'}/${parent ? parent.fulldir + '/' : ''}${hasChildren ? utils.hyphenate(name) + '/' : ''}${utils.pascal(name)}`,
    };
    if (hasChildren) {
      router.children = [];
    }
    return router;
  }
}

function writeRouter(router, config, force) {
  // if (utils.exists(config.dist)) {
  //   utils.rmdir(config.dist);
  // }

  write(router);

  function write(router) {
    if (router.routers) {
      utils.writeFile(`${config.dist}/index.js`, template(utils.resolve(__dirname, '../templates/router.art'), router), force);
    } else {
      utils.writeFile(`${config.dist}/${router.fulldir}/index.js`, template(utils.resolve(__dirname, '../templates/router-module.art'), {
        router,
      }), force);
    }
    const children = router.children || router.routers;
    if (children) {
      children
        .filter(child => child.children)
        .forEach(write);
    }
  }
}
