var Command = require('ronin').Command;
var ukko = require('ukko');

var Install = Command.extend({
    desc: 'Command to install ',

    options: {
        repos: 'string',
        configPath: 'string',
        force: {
            type: 'boolean',
            alias: 'f'
        }
    },

    run: function (repos, force,configPath, fpCallback) {
        ukko.installOrUpdate({
            repos: repos,
            force: force,
            configPath: configPath,
            onEnd: function () {
                if(typeof fpCallback === "function"){
                    fpCallback();
                }
            }
        });
    }
});

module.exports = Install;