const main = require('../main/main');

describe('taxi fee', function () {

    it("起步价两公里以内", function() {
        let km = 1;
        let minute = 1;
        let result = main(km, minute);
        expect(result).toEqual("6");
    });

    it("两公里以上，8公里以内", function() {
        let km = 3;
        let minute = 1;
        let result = main(km, minute);
        expect(result).toEqual("3");
    });

    it("八公里以上", function() {
        let km = 10;
        let minute = 9;
        let result = main(km, minute);
        expect(result).toEqual("11");
    });

});
