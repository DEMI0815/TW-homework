
module.exports = function printInventory(inputs) {
    let itCount = 0;
    let items = "";
    let freeItems = "";
    let totalMoney = 0;
    let saveMoney = 0;
    for(let i = 0; i < inputs.length - 1;) {

        let barcode = inputs[i].split("-")[0];
        let count = inputs[i].split("-")[1] === undefined ? 1 : inputs[i].split("-")[1];
        let nextCode = inputs[i+1].split("-")[0];
        if(barcode === nextCode) {
            i++;
            itCount += count;
        } if((barcode !== nextCode && itCount !== 0) || i === inputs.length - 1) {
            items += item(barcode, itCount + 1);
            freeItems += freeItem(barcode, itCount + 1);
            totalMoney += total(barcode, itCount + 1);
            saveMoney += save(barcode, itCount + 1);
            itCount = 0;
            i++;
        }else if(barcode !== nextCode && itCount === 0){
            items += item(barcode, count);
            freeItems += freeItem(barcode, count);
            totalMoney += total(barcode, count);
            saveMoney += save(barcode, count);
            i++;
        }

    }

    console.log( '***<没钱赚商店>购物清单***\n' +
        items +
        '----------------------\n' +
        '挥泪赠送商品：\n' +
        freeItems +
        '----------------------\n' +
        '总计：'+ totalMoney.toFixed(2) +'(元)\n' +
        '节省：'+ saveMoney.toFixed(2) +'(元)\n' +
        '**********************');
};

let a = require('./datbase.js');

function save(barcode, count) {
    if(isSale(barcode) && count >= 2)
        return getPrice(barcode);
    return 0;
}

function total(barcode, count) {
    if(isSale(barcode) && count >= 2)
        return getPrice(barcode) * (count-1);
    else
        return getPrice(barcode) * count;
}

function freeItem(barcode, count) {
    if(isSale(barcode) && count >= 2)
        return "名称："+ getName(barcode) + "，数量：1"+ getUnit(barcode) +"\n";
    return '';
}

function item(barcode, count) {
    let name = getName(barcode);
    let unit = getUnit(barcode);
    let price = getPrice(barcode).toFixed(2);
    let totalMoney = (price * count).toFixed(2);
    if(isSale(barcode) && count >= 2)
        totalMoney = (price * (count-1)).toFixed(2);

    return "名称：" + name + "，数量：" + count + unit + "，单价：" + price + "(元)，小计：" + totalMoney + "(元)\n";
}

function isSale(barcode) {
    for(let i = 0; i < a.loadPromotions()[0].barcodes.length; i++) {
        if(barcode === a.loadPromotions()[0].barcodes[i])
            return true;
    }
    return false;
}

function getName(barcode) {
    for(let i = 0; i < a.loadAllItems().length; i++) {
        if(barcode === a.loadAllItems()[i].barcode)
            return a.loadAllItems()[i].name;
    }
}

function getUnit(barcode) {
    for(let i = 0; i < a.loadAllItems().length; i++) {
        if(barcode === a.loadAllItems()[i].barcode)
            return a.loadAllItems()[i].unit;
    }
}

function getPrice(barcode) {
    for(let i = 0; i < a.loadAllItems().length; i++) {
        if(barcode === a.loadAllItems()[i].barcode)
            return a.loadAllItems()[i].price;
    }
}