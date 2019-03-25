module.exports = function main(km, minute) {

    const startPrice = 6;
    const freightPerKilometre = 0.8;
    const parkPerMinute = 0.25;
    const moreThanEight = 0.5;

    if(km <= 2) {
        return startPrice;
    }

    if(km > 2 && km < 8) {
        let result = startPrice + (km - 2) * freightPerKilometre + minute * parkPerMinute;
        return Math.round(result);
    }

    return Math.round(startPrice + 6 * freightPerKilometre + (km - 8) * freightPerKilometre * (1 + moreThanEight) + minute * parkPerMinute);
};