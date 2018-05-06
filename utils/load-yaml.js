const yaml = require('js-yaml');
const fs = require('fs');

module.exports = function (file) {
  let data = null;
  try {
    data = yaml.safeLoad(fs.readFileSync(file, 'utf-8'));
  } catch (e) {
    console.log(e);
  }
  return data;
};
