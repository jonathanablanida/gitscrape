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
	return git(cmd);
};

var git = function (cmd) {

    if (typeof cmd === 'string') {
        cmd = cmd.split(' ');
    }

	gitcmd = ps.spawn('git', cmd);
    results = redirectToObject(gitcmd);

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

var redirectToObject = function (process, object) {

    object = object || {};
    object.stdout = [];
    object.stderr = [];

    process.stdout.on('data', function(data) {
        object.stdout.push('' + data);
    });

    process.stderr.on('data', function(data) {
        object.stderr.push('' + data);
    });

    return object;
};

exports.run = run;
exports.find = findCommits;

