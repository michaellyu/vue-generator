#!/usr/bin/env node

const program = require('commander');
const componentsGenerator = require('../generators/components-generator.js');

program
  .option('-f, --force', 'overwrite target file if it exists')
  .parse(process.argv);

componentsGenerator.run(program.force);
