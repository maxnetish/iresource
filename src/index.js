var frontResourceGetter = require('./front-resource-getter');
var descriptors = {},
    noopFunction = function () {
        return;
    },
    check = require('./check');
var isClient = true;

var functionToExport = function (resourceName) {
    if (!descriptors.hasOwnProperty(resourceName)) {
        throw('Resource "' + resourceName + '" is not registered');
    }

    if(!isClient) {
        return descriptors[resourceName].backendMethod;
    }

    return frontResourceGetter(descriptors[resourceName]);
};

functionToExport.add = function (resourceName, resourceDescriptor) {
    check.checkAddArgs(resourceName, resourceDescriptor);
    descriptors[resourceName] = resourceDescriptor;
    return functionToExport;
};

functionToExport.setClientMode = function () {
    isClient = true;
};

functionToExport.setServerMode = function () {
    isClient = false;
};

module.exports = functionToExport;