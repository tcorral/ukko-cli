var Command = require('ronin').Command;
var ukko = require('ukko');

var Update = Command.extend({
    desc: 'Command to update ',

    run: function (configPath, repos, force, fpCallback) {
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