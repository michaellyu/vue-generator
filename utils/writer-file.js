const fs = require('fs');
const mkdirs = require('mkdirs');
const exists = require('./exists');

module.exports = (file, data, force) => {
  if (force || !exists(file)) {
    mkdirs(file.replace(/[\\\/]+[^\\\/]*?$/, ''));
    fs.writeFileSync(file, data);
  } else {
    console.info(`"${file}" is existed`);
  }
};
