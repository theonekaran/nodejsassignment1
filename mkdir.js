#!/usr/bin/env node --use-strict --harmony-destructuring

require('./helper')
let fs = require('fs').promise
let argv = require('yargs').argv
let path = require('path')
let co = require('co')

function* mkdir(dirPath) {
    
	try {
    	let done = yield fs.mkdir(dirPath)
	}
	catch (e) { 
			if (e.errno == -2) {
				co(mkdir(path.dirname(dirPath)))
				co(mkdir(dirPath))
			}
	}
    
}

function* main() {
	let createdir = yield mkdir(argv._[0])
}

module.exports = main