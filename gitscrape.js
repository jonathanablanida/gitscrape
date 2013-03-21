var _        = require('underscore');
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
            function objecter (data) {
                var details = {};
                var currentKey = null; // The details key currently being added to

                outputs = data.toString().split('\n');

                _.each(outputs, function (line) {
                    var matches = line.match(/^\s*[\w\s]+:/g);

                    // Add the detail item from the commit as a property
                    if (matches) {

                        //Only take fist match (since regex only grabs beginning of string)
                        var match = matches[0].trim();
                        var key = match.slice(0, match.length-1).toLowerCase();
                        var value = line.slice(line.indexOf(match) + match.length).trim();

                        details[key] = value || [];
                        currentKey = key;

                    }
                    // Add the line as an item under the detail key
                    else {
                        BULLET_REGEX = /^\s*(\*+|\-+|\d+\.|\w\.)/g;

                        if (currentKey && line.match(BULLET_REGEX)) {

                            if (typeof details[currentKey] !== 'array') {
                                details[currentKey] = [];
                            }
                            details[currentKey].push(line.trim());
                        }
                    }
                });

                object.stdout.push(details);
            };


            /**
             * Actually grab the data from the process streams
             */
            process.stdout.on('data', objecter);

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

            var args = _this.getArgs();

            scraper.findCommits(args.tag, null, function (err, results) {
                console.log(results);
            });

        },

        /**
         * Setup arguments
         */
        getArgs: function () {

            var ArgumentParser = require('argparse').ArgumentParser;

            var argurator = new ArgumentParser({
                addHelp:true,
                description: 'Compile git commit history based on keywords'
            });

            argurator.addArgument(
                [ '-s', '--since' ],
                {
                    help: 'Return commits since DATE.'
                }
            );

            argurator.addArgument(
                [ '-k', '--keyword' ],
                {
                    help: 'Only return commits that contain KEYWORD in their message.'
                }
            );

            argurator.addArgument(
                ['tag'],
                {
                    help: 'The commit message TAG that forms the basis of the results. Git commit TAGS should always be in the form of \'TAG:\', followed by a list of items denoted by \'-\', \'*\', or numbers like \'1.\'.'
                }
            );

            var args = argurator.parseArgs();
            console.log(args);
            return args;

        },

        /**
         * Format the result data
         */
        formatOutput: function (data) {

        }

    };

    return new selfie(); // Still funny.

}());

module.exports.CLI = CLI;
module.exports.Gitscrape = Gitscrape;


