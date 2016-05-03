describe ('iresource in backend environment.', function () {
    describe('iresource()', function () {
        var resourceDescriptor,
            resourceName,
            iresource,
            methodArgs,
            methodResult;


        beforeEach(function () {
            resourceName = 'resource name';
            methodResult = {
                result: 'some'
            };
            resourceDescriptor = {
                backendMethod: jasmine.createSpy('backendMethod').and.returnValue(methodResult),
                httpPath: 'backend/resource/method',
                httpMethod: 'GET'
            };
            methodArgs = {
                foo: 'bar'
            };
            iresource = require('../src');
            iresource.setServerMode();
        });

        it('should call backend function when resource requests', function () {
            iresource.add(resourceName, resourceDescriptor);
            iresource(resourceName)(methodArgs);
            expect(resourceDescriptor.backendMethod).toHaveBeenCalledWith(methodArgs);
        });

        it('should return value from backendMethod', function () {
            iresource.add(resourceName, resourceDescriptor);
            expect(iresource(resourceName)(methodArgs)).toBe(methodResult);
        });
    });
});