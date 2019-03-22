const main = require('../main/main');

describe('taxi fee', function () {

    it("The starting price is within 2 kilometers.", function() {
        let km = 1;
        let minute = 1;
        let result = main(km, minute);
        expect(result).toEqual(6);
    });

    it("More than 2 kilometers, less than 8 kilometers", function() {
        let km = 3;
        let minute = 1;
        let result = main(km, minute);
        expect(result).toEqual(3);
    });

    it("More than 8 kilometers", function() {
        let km = 10;
        let minute = 9;
        let result = main(km, minute);
        expect(result).toEqual(11);
    });

});
