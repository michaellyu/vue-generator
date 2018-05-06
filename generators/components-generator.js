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
  writeComponents(router, config, force);
}

function getConfig() {
  if (!baseConfig.components) {
    throw new Error('Not found components in .vuegeneratorrc.js');
  }
  if (!baseConfig.components.src) {
    throw new Error('Not found components src in .vuegeneratorrc.js');
  }
  if (!baseConfig.components.dist) {
    throw new Error('Not found components dist in .vuegeneratorrc.js');
  }
  const config = baseConfig.components;
  config.eslint = baseConfig.eslint;
  config.src = utils.resolve(root, config.src);
  config.dist = utils.resolve(root, utils.fixdir(config.dist));
  return config;
}

function getRouter(config) {
  let routerData = utils.loadYaml(config.src);
  if (routerData.router) {
    routerData = routerData.router;
  }
  const router = {
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
            const router = makeRouter(parent, key, key, true);
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
      name: utils.camelize(name),
      path: utils.hyphenate(path),
      dir: utils.hyphenate(name),
      componentName: utils.pascal(name),
      fulldir: `${parent ? parent.fulldir + '/' : ''}${utils.hyphenate(name)}`,
      componentdir: `${parent ? parent.fulldir : ''}`,
      template: config.template,
      script: config.script,
      style: config.style,
    };
    if (hasChildren) {
      router.children = [];
    }
    return router;
  }
}

function writeComponents(router, config, force) {
  write(router);

  function write(router) {
    if (!router.routers) {
      if (router.children) {
        utils.writeFile(`${config.dist}/${router.fulldir ? router.fulldir + '/' : ''}${router.componentName}.vue`, template(utils.resolve(__dirname, '../templates/components-view.art'), {
          eslint: config.eslint,
          components: router,
        }), force);
      } else {
        utils.writeFile(`${config.dist}/${router.componentdir ? router.componentdir + '/' : ''}/${router.componentName}.vue`, template(utils.resolve(__dirname, '../templates/components.art'), {
          eslint: config.eslint,
          components: router,
        }), force);
      }
    }
    const children = router.children || router.routers;
    if (children) {
      children.forEach(write);
    }
  }
}


