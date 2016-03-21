#!/usr/bin/env node --use-strict --harmony-destructuring

require('./helper')
let fs = require('fs').promise
let argv = require('yargs').argv

function* cat() {
	let file = yield fs.readFile(argv._[0])
    process.stdout.write(file + '\n')
}

module.exports = cat