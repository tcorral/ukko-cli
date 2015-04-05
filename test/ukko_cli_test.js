'use strict';

var grunt = require('grunt');
var path = require('path');
var Install = require('../commands/install');
var Update = require('../commands/update');
var clean = function () {
    var pathBower = path.join(process.cwd(), 'bower.json');
    var bowerData = grunt.file.readJSON(pathBower);
    delete bowerData.installed;
    grunt.file.write(pathBower, JSON.stringify(bowerData, null, '    '));
    grunt.file.delete('test/generated');
    grunt.file.delete('error.log');
    grunt.file.delete('out.log');
};
var compareContent = function (repoPath, subFolder, test) {
    var pathGenRepos = path.join(process.cwd(), "test", "generated", repoPath);
    var expectedRepos = path.join(process.cwd(), "test", "expected", subFolder, repoPath);
    grunt.file.recurse( pathGenRepos, function (abspath, rootdir, subdir, filename) {
        if(filename !== '.bower.json'){
            var genContent = grunt.file.read(abspath);
            var expPath = abspath.replace(pathGenRepos, expectedRepos);
            var expContent = grunt.file.read(expPath);
            test.equal(genContent, expContent);
        }
    });
};

exports.ukko = {
    installAllRepos: function (test) {
        var install = new Install();
        console.log(install.run);
        install.run(undefined, undefined, "test/fixtures/config.json", function () {
            compareContent('repos', 'installAllRepos', test);
            clean();
            test.done();
        });
    },
    updateAllRepos: function (test) {
        var install = new Install();
        var update = new Update();
        install.run(undefined, undefined, "test/fixtures/config.json", function () {
            update.run(undefined, undefined, "test/fixtures/config.json", function () {
                compareContent('repos', 'updateAllRepos', test);
                clean();
                test.done();
            });
        });
    },
    installOneRepo: function (test){
        var install = new Install();
        install.run("test/generated/repos/airbnb/javascript", undefined, "test/fixtures/config.json", function () {
            compareContent('repos/airbnb/javascript', 'installOneRepo', test);
            clean();
            test.done();
        });
    },
    updateOneRepo:function (test) {
        var install = new Install();
        var update = new Update();
        install.run(undefined, undefined, "test/fixtures/config.json", function () {
            update.run(undefined, undefined, "test/fixtures/config.json", function () {
                compareContent('repos/airbnb/javascript', 'updateOneRepo', test);
                clean();
                test.done();
            });
        });
    },

};