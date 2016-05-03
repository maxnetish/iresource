var WRONG_ADD_ARGS = 'Wrong arguments';
var allowedHttpMethods = ['GET', 'POST', 'PUT', 'DELETE'];

function checkAddArgs(resourceName, resourceDescriptor) {
    if (!resourceName || !resourceDescriptor) {
        throw(WRONG_ADD_ARGS);
    }

    if (typeof resourceDescriptor.backendMethod !== 'function') {
        throw(WRONG_ADD_ARGS);
    }

    if (typeof resourceDescriptor.httpPath !== 'string') {
        throw(WRONG_ADD_ARGS);
    }

    if (allowedHttpMethods.indexOf(resourceDescriptor.httpMethod) === -1) {
        throw(WRONG_ADD_ARGS);
    }
}

module.exports = {
    checkAddArgs: checkAddArgs
};