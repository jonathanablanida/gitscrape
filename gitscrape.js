var fs 		 = require('fs');
var ps		 = require('child_process')
var optimist = require('optimist');

/**
 * Run cli
 */
var run = function () {
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
	git(cmd);
};

var git = function (cmd) {

    if (typeof cmd === 'string') {
        cmd = cmd.split(' ');
    }

	gitcmd = ps.spawn('git', cmd);
	redirectOutput(gitcmd);
};

var redirectOutput = function (process) {

	process.stdout.on('data', function(data) {
		console.log('' + data);
	});

	process.stderr.on('data', function(data) {
		console.log('' + data);
	});

};

exports.run = run;
exports.find = find;

