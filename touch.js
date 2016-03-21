#!/usr/bin/env node --use-strict --harmony-destructuring

require('./helper')
let fs = require('fs').promise
let argv = require('yargs').argv

function* touch() {
    let file = yield fs.open(argv._[0],'r+')
    let ft = new Date()
    yield fs.futimes(file, ft, ft)
}

module.exports = touch