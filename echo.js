#!/usr/bin/env node --use-strict --harmony-destructuring

require('./helper')
let fs = require('fs').promise
let argv = require('yargs').argv

function* echo() {
    process.stdout.write(argv._ + '\n')
}

module.exports = echo