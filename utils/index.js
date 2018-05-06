const resolve = require('path').resolve;
const loadYaml = require('./load-yaml');
const mkdirs = require('mkdirs');
const exists = require('./exists');
const fixdir = require('./fixdir');
const rmdir = require('./rmdir');
const writeFile = require('./writer-file');
const copyFile = require('./copy-file');

const rCamelize = /-(\w)/g;
const rPascal = /(?:^|-)(\w)/g;
const rHyphenate = /([a-z\d])([A-Z])/g;

module.exports = {
  camelize (name) {
    return name.replace(rCamelize, (_, c) => c ? c.toUpperCase() : '');
  },
  pascal (name) {
    return name.replace(rPascal, (_, c) => c ? c.toUpperCase() : '');
  },
  hyphenate (name) {
    return name.replace(rHyphenate, '$1-$2').toLowerCase();
  },
  isObject (value) {
    return Object.prototype.toString.call(value) === '[object Object]';
  },
  isString (value) {
    return typeof value === 'string';
  },
  resolve,
  loadYaml,
  mkdirs,
  exists,
  fixdir,
  rmdir,
  writeFile,
  copyFile,
};
