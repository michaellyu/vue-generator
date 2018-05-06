const fs = require('fs');
const exists = require('./exists');

module.exports = (src, target, force) => {
  if (force || !exists(target)) {
    fs.createReadStream(src)
      .pipe(fs.createWriteStream(target));
  } else {
    console.info(`"${target}" is existed`);
  }
};
