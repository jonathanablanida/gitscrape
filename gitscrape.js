var fs 		 = require('fs');
var ps		 = require('child_process');

/**
 * Run cli
 */
var run = function () {

    // Only require optimist when running the CLI
    var optimist = require('optimist');
	var args = getArgs();

    findCommits(args._);

};

/**
 * Setup arguments
 */
var getArgs = function () {

	argv = optimist.argv;
	return argv;
};

var findCommits = function (expression, options) {
    cmd = "log --grep=" + expression;


    if (typeof cmd === 'string') {
        cmd = cmd.split(' ');
    }

    gitcmd = ps.spawn('git', cmd);
    results = redirect(gitcmd);

    return results
};

var redirectToScreen = function (process) {

	process.stdout.on('data', function(data) {
		console.log('' + data);
	});

	process.stderr.on('data', function(data) {
		console.log('' + data);
	});

};

/**
 * Redirect stdout and stderr streams to a js object
 */
var redirectToObject = function (process, options) {

    options = options || {};

    /**
     * Get redirection options
     */
    var format = options.format || 'log';

    object = {
        stdout: [],
        stderr: []
    };

    process.stdout.on('data', function(data) {
        object.stdout.push('' + data);
    });

    process.stderr.on('data', function(data) {
        object.stderr.push('' + data);
    });

    return object;
};

/**
 * Globals
 */
 var redirect = redirectToObject;

exports.run = run;
exports.find = findCommits;


