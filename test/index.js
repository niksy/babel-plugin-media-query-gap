var assert = require('assert');
var fs = require('fs');
var pify = require('pify');
var babel = require('babel-core');
var fn = require('../');

function runTest ( testCase, opts ) {
	return Promise.all([
		pify(fs.readFile)(`./test/fixtures/${testCase}.expected.js`, 'utf8'),
		pify(babel.transformFile)(`./test/fixtures/${testCase}.js`, {
			plugins: [[fn, opts || {}]]
		})
	])
		.then(( res ) => {
			assert.equal(res[0].trim(), res[1].code.trim());
		});
}

it('screen and (max-{width/height}:{value})', function () {
	return runTest('max', {});
});

it('screen and (min-{width/height}:{value}) and (max-{width/height}:{value})', function () {
	return runTest('min-max', {});
});
