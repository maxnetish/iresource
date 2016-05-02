describe('Module', function () {

    describe('main', function () {
        it('should exports', function () {
            var mdl = require('../src');
            expect(mdl).toBeDefined();
        });

        it('should exports function "add()"', function () {
            var mdl = require('../src');
            expect(typeof mdl.add).toBe('function');
        });
    });

    describe('in backend environment', function () {
        var resourceDescriptor = {
              
        };

        it('should call backend function when resource requests', function () {

        })
    });

});