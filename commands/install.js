var Command = require('ronin').Command;
var ukko = require('ukko');

var Install = Command.extend({
    desc: 'Command to install ',

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

module.exports = Install;