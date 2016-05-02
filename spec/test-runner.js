var Jasmine = require('jasmine');
var util = require('util');
var platfrom = require('platform');

var jasmineInstance = new Jasmine();

console.log('Run jasmine tests on ', platfrom.toString());

jasmineInstance.loadConfigFile('spec/support/jasmine.json');

jasmineInstance.onComplete(function(passed) {
    if(passed) {
        console.log('All specs have passed');
    }
    else {
        console.log('At least one spec has failed');
    }
});

jasmineInstance.configureDefaultReporter({
    timer: new jasmine.Timer(),
    print: function() {
        process.stdout.write(util.format.apply(this, arguments));
    },
    showColors: true,
    jasmineCorePath: jasmineInstance.jasmineCorePath
});

jasmineInstance.execute();