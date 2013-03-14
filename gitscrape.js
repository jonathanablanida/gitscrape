var fs 		 = require('fs');
var ps		 = require('child_process');


var Gitscrape = (function () {

    var _this = this;
    var self = function () {
        _this.redirect = this.redirectToObject;
    };

    self.prototype = {

        init: function () {
            _this.redirect = this.redirectToObject;
        },

        /**
         * Run cli
         */
        run: function () {

            // Only require optimist when running the CLI
            var optimist = require('optimist');
            var args = getArgs();

            findCommits(args._);

        },

        /**
         * Setup arguments
         */
        getArgs: function () {

            argv = optimist.argv;
            return argv;
        },

        findCommits: function (expression, options) {
            cmd = "log --grep=" + expression;


            if (typeof cmd === 'string') {
                cmd = cmd.split(' ');
            }

            gitcmd = ps.spawn('git', cmd);
            results = redirect(gitcmd);

            return results
        },

        redirectToScreen: function (process) {

            process.stdout.on('data', function(data) {
                console.log('' + data);
            });

            process.stderr.on('data', function(data) {
                console.log('' + data);
            });

        },

        /**
         * Redirect stdout and stderr streams to a js object
         */
        redirectToObject: function (process, options) {

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
        },

    };

    return new self();

}());

var CLI = (function () {

}());

module.exports = Gitscrape;


