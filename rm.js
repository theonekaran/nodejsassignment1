#!/usr/bin/env node --use-strict --harmony-destructuring

require('./helper')
let fs = require('fs').promise
let argv = require('yargs').argv
let co = require('co')

function* rm(filePath) {
    try {
    	let statRoot = yield fs.stat(filePath)
 	
		if (statRoot.isFile()) {
			try {
				let delfile = yield fs.unlink(filePath)
			}
			catch (e) {
				console.log(e)
			}
		}
		else if (statRoot.isDirectory()) {
	    	let fileNames = yield fs.readdir(filePath)
	    	if (fileNames.length == 0) { 
	    		let deldir = yield fs.rmdir(filePath)
	    	}
			else {
				for (let fileName of fileNames) {
					co(rm(filePath + '/' + fileName))
				}
			}
			try {
				let deldir = yield fs.rmdir(filePath)
			}
			catch (e) {
				co(rm(filePath))
			}
						
		}
	}
	catch (e) {
		
	}
	
}

function* main() {
	let delfile = yield rm(argv._[0])	
}

module.exports = main