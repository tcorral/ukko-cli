var Command = require('ronin').Command;
var ukko = require('ukko');

var Update = Command.extend({
    desc: 'Command to update ',

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

module.exports = Update;