var request = require('superagent');
var Q = require('q');


function frontResourceGetter(resourceDescriptor) {
    return function (reqData) {
        var dfr = Q.defer();
        var req = request(resourceDescriptor.httpMethod, resourceDescriptor.httpPath);
        if (resourceDescriptor.httpMethod === 'GET' || resourceDescriptor.httpMethod === 'DELETE') {
            req.query(reqData);
        } else {
            req.send(reqData);
        }
        req.end(function (err, res) {
            if (err) {
                dfr.reject(err);
            } else {
                dfr.resolve(res.body);
            }
        });
        return dfr.promise;
    };
}

module.exports = frontResourceGetter;