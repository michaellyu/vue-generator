#!/usr/bin/env node

const program = require('commander');

program
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('init', 'initial config file .vuegeneratorrc.js and router.yaml')
  .command('all', 'generate router and components by router.yaml')
  .command('router', 'generate router by router.yaml')
  .command('components', 'generate components by router.yaml')
  .parse(process.argv);
