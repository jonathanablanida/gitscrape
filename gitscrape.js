/**
 * Run cli
 */
var optimist = require('optimist');

exports.run = function () {
	var args = getArgs();

	console.log('Welcome to gitscrape!!');
	console.log(argv);
};

/**
 * Setup arguments
 */
var getArgs = function () {

	argv = optimist.argv;
	return argv;
};

var find = function (expression) {

};

