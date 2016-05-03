describe('iresource in backend environment.', function () {
    describe('iresource()', function () {
        var iresource,
            superagentMockConfig,
            superagentMock,
            resourceDescriptorGet,
            resourcePath,
            resourceNameGet,
            noopFunction,
            resourceDescriptorPost,
            resourceNamePost,
            resourceDescriptorPut,
            resourceNamePut,
            resourceDescriptorDelete,
            resourceNameDelete;

        beforeEach(function () {
            noopFunction = function () {
            };
            resourcePath = 'backend/resource/method';
            resourceNameGet = 'resource name get';
            resourceDescriptorGet = {
                backendMethod: noopFunction,
                httpPath: resourcePath,
                httpMethod: 'GET'
            };
            resourceNamePost = 'resource name post';
            resourceDescriptorPost = {
                backendMethod: noopFunction,
                httpPath: resourcePath,
                httpMethod: 'POST'
            };
            resourceNamePut = 'resource name put';
            resourceDescriptorPut = {
                backendMethod: noopFunction,
                httpPath: resourcePath,
                httpMethod: 'PUT'
            };
            resourceNameDelete = 'resource name delete';
            resourceDescriptorDelete = {
                backendMethod: noopFunction,
                httpPath: resourcePath,
                httpMethod: 'DELETE'
            };
            superagentMockConfig = [
                {
                    pattern: resourcePath,
                    fixtures: function (match, params, headers) {
                        return {
                            params: params
                        };
                    },
                    get: function (match, data) {
                        return {
                            body: {
                                method: 'GET',
                                data: data
                            }
                        };
                    },
                    post: function (match, data) {
                        return {
                            body: {
                                method: 'POST',
                                data: data
                            }
                        };
                    },
                    put: function (match, data) {
                        return {
                            body: {
                                method: 'PUT',
                                data: data
                            }
                        };
                    },
                    'delete': function (match, data) {
                        return {
                            code: 200
                        };
                    }
                }
            ];
            spyOn(superagentMockConfig[0], 'get').and.callThrough();
            spyOn(superagentMockConfig[0], 'post').and.callThrough();
            spyOn(superagentMockConfig[0], 'put').and.callThrough();
            spyOn(superagentMockConfig[0], 'delete').and.callThrough();
            spyOn(superagentMockConfig[0], 'fixtures').and.callThrough();

            superagentMock = require('superagent-mock')(require('superagent'), superagentMockConfig);
            iresource = require('../src');
            iresource.setClientMode();
        });

        afterEach(function () {
            superagentMock.unset();
        });

        it('should request httpPath (GET method)', function () {
            iresource.add(resourceNameGet, resourceDescriptorGet);
            iresource(resourceNameGet)({foo: 'bar'});
            expect(superagentMockConfig[0].get).toHaveBeenCalled();
        });

        it('should request httpPath (PUT method)', function () {
            iresource.add(resourceNamePut, resourceDescriptorPut);
            iresource(resourceNamePut)({foo: 'bar'});
            expect(superagentMockConfig[0].put).toHaveBeenCalled();
        });

        it('should request httpPath (POST method)', function () {
            iresource.add(resourceNamePost, resourceDescriptorPost);
            iresource(resourceNamePost)({foo: 'bar'});
            expect(superagentMockConfig[0].post).toHaveBeenCalled();
        });

        it('should request httpPath (DELETE method)', function () {
            iresource.add(resourceNameDelete, resourceDescriptorDelete);
            iresource(resourceNameDelete)({foo: 'bar'});
            expect(superagentMockConfig[0]['delete']).toHaveBeenCalled();
        });

        it('should request httpPath (GET method) and return promise which should resolve to expected data', function (done) {
            iresource.add(resourceNameGet, resourceDescriptorGet);
            iresource(resourceNameGet)({foo: 'bar'})
                .then(function (result) {
                    expect(result.method).toBe('GET');
                    done();
                });
        });
    });
});