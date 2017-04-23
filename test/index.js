'use strict';

const assert = require('assert');
const fs = require('fs');
const pify = require('pify');
const babel = require('babel-core');
const fn = require('../');

function runTest ( testCase, opts ) {
	return Promise.all([
		pify(fs.readFile)(`./test/fixtures/${testCase}.expected.js`, 'utf8'),
		pify(babel.transformFile)(`./test/fixtures/${testCase}.js`, {
			plugins: [[fn, opts || {}]]
		})
	])
		.then(( res ) => {
			assert.equal(res[1].code.trim(), res[0].trim());
		});
}

it('should process "screen and (max-{width/height}:{value})"', function () {
	return runTest('max', {});
});

it('should process "screen and (min-{width/height}:{value}) and (max-{width/height}:{value})"', function () {
	return runTest('min-max', {});
});

it('should not process variables', function () {
	return runTest('vars', {});
});

it('should process media query comments', function () {
	return runTest('comments', {});
});
