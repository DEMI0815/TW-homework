module.exports = function main(km, minute) {
    if(km <= 2) {
        return "" + Math.round(6 + minute * 0.25);
    }

    if(km > 2 && km < 8) {
        let result = km * 0.8 + minute * 0.25;
        return "" + Math.round(result);
    }

    return "" + Math.round(6.4 + (km - 8) * 0.8 * (1 + 0.5) + minute * 0.25);
};