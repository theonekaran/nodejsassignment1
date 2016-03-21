#!/usr/bin/env node --use-strict --harmony-destructuring
require('./helper')
let fs = require('fs').promise
let path = require('path')
let _ = require('lodash')
let argv = require('yargs').argv
let co = require('co')

function* ls(direc) {
	let fileNames = yield fs.readdir(direc)
	for (let fileName of fileNames) {
		let filePath = path.join(direc, fileName)
		let stat = yield fs.stat(filePath)
		if (!stat.isDirectory()) {
			process.stdout.write(fileName + '\n')
		}
	}
}

function* ls_rec(rootPath) {
	let statRoot = yield fs.stat(rootPath)
	if (statRoot.isFile()) {
			return rootPath
		}
	else {
		let lsPromises = []
		let fileNames = yield fs.readdir(rootPath)
		for (let fileName of fileNames) {
			let filePath = path.join(rootPath, fileName)
			let promise = co(ls(filePath))
    		lsPromises.push(promise)
		}
		return yield Promise.all(lsPromises)

	}

	
}

function* main() {
    if (argv.R) {
    	let filePaths = _.flatten(yield ls_rec(argv._[0]))
    	for (let fileName of filePaths) {
	    	process.stdout.write(fileName + "\n")
	    }
    }
    else {
    	let filePaths = _.flatten(yield ls(argv._[0]))
    }
    
}

module.exports = main