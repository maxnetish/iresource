describe('Module', function () {
    describe('main', function () {
        var mdl;
        var resourceName;
        var resourceDescriptor;
        var noopFunction;

        beforeEach(function () {
            mdl = require('../src');
            resourceName = 'resource name';
            noopFunction = function () {
            };
            resourceDescriptor = {
                backendMethod: noopFunction,
                httpPath: 'backend/resource/method',
                httpMethod: 'GET'
            };
        });

        it('should be function', function () {
            expect(typeof mdl).toBe('function');
        });

        it('should exports function "add()"', function () {
            expect(typeof mdl.add).toBe('function');
        });

        it('should return module from add() call', function () {
            expect(mdl.add(resourceName, resourceDescriptor)).toBe(mdl);
        });

        it('should throw exception when second arg of add() is empty', function () {
            expect(function () {
                mdl.add(resourceName);
            }).toThrow();
        });

        it('should throw exception when omits mandatory params in second arg of add()', function () {
            expect(function () {
                mdl.add(resourceName, {});
            }).toThrow();
            expect(function () {
                mdl.add(resourceName, {foo: 'bar'});
            }).toThrow();
            expect(function () {
                mdl.add(resourceName, {httpMethod: 'GET'});
            }).toThrow();
        });

        it('should throw exception when params in second arg of add() have wrong type', function () {
            expect(function () {
                mdl.add(resourceName, {backendMethod: 'bar', httpPath: 'foo', httpMethod: 'GET'});
            }).toThrow();
            expect(function () {
                mdl.add(resourceName, {backendMethod: noopFunction, httpPath: [], httpMethod: 'GET'});
            }).toThrow();
        });

        it('should throw exception when httpMethod param in second arg of add() is unsupported', function () {
            expect(function () {
                mdl.add(resourceName, {backendMethod: noopFunction, httpPath: 'foo', httpMethod: 'BAR'});
            }).toThrow();
        });
    });
});