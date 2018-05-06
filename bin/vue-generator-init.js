#!/usr/bin/env node

const program = require('commander');
const configGenerator = require('../generators/config-generator.js');

program
  .option('-f, --force', 'overwrite target file if it exists')
  .parse(process.argv);

configGenerator.run(program.force);
