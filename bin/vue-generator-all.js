#!/usr/bin/env node

const program = require('commander');
const componentsGenerator = require('../generators/components-generator.js');
const routerGenerator = require('../generators/router-generator.js');

program
  .option('-f, --force', 'overwrite target file if it exists')
  .parse(process.argv);

componentsGenerator.run(program.force);
routerGenerator.run(program.force);

