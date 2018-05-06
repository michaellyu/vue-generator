const utils = require('../utils');
const root = utils.resolve(process.cwd());

module.exports = {
  run,
};

function run(force) {
  utils.copyFile(utils.resolve(__dirname, '../templates/config/.vuegeneratorrc.js'), `${root}/.vuegeneratorrc.js`, force);
  utils.copyFile(utils.resolve(__dirname, '../templates/config/router.yaml'), `${root}/router.yaml`, force);
}
