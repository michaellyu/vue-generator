#!/usr/bin/env node

const program = require('commander');
const routerGenerator = require('../generators/router-generator.js');

program
  .option('-f, --force', 'overwrite target file if it exists')
  .parse(process.argv);

routerGenerator.run(program.force);
