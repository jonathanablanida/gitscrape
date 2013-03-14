var fs 		 = require('fs');
var ps		 = require('child_process');


var Gitscrape = (function () {

    var _this = null

    var selfie = function () {
        _this = this;
    };

    selfie.prototype = {

        findCommits: function (expression, options, done) {
            cmd = "log --grep=" + expression;


            if (typeof cmd === 'string') {
                cmd = cmd.split(' ');
            }

            gitcmd = ps.spawn('git', cmd);
            results = _this.parseOutput(gitcmd, null, done);

            return results
        },

        /**
         * Redirect stdout and stderr streams to a js object
         * @process: The node ChildProcess object to listen on
         * @options: Specific options to use
         * @done: The callback in format (err, results).
         *        if there is an err, results are stderr, else stdout
         * returns: A reference to the object holding the stream. Not
         *          guaranteed to have all data until ps has exited.
         */
        parseOutput: function (process, options, done) {

            options = options || {};
            done = done || function () {};

            object = {
                stdout: [],
                stderr: []
            };

            /**
             * Functions that will format output in special ways
             */
            function log (data) {
                object.stdout.push('' + data);
            };


            /**
             * Actually grab the data from the process streams
             */
            var fn = log;
            process.stdout.on('data', log);

            process.stderr.on('data', function(data) {
                object.stderr.push('' + data);
            });

            process.on('close', function (code) {
                if (code !== 0) {
                    return done("Error!", object.stderr);
                }
                done(null, object);
            });

            return object;
        },

    };

    return new selfie(); // Sick pun.

}());

var CLI = (function () {
    var optimist = require('optimist');

    var _this = null;
    var scraper = Gitscrape;

    var selfie = function (){
        _this = this;

        //init code here. Arguments?
    };

    selfie.prototype = {
        /**
         * Run cli
         */
        run: function () {

            // Only require optimist when running the CLI
            var args = _this.getArgs();

            scraper.findCommits(args._, null, function (err, results) {
                console.log(results);
            });

        },

        /**
         * Setup arguments
         */
        getArgs: function () {

            argv = optimist.argv;
            return argv;
        }

    };

    return new selfie(); // Still funny.

}());

module.exports.CLI = CLI;
module.exports.Gitscrape = Gitscrape;


