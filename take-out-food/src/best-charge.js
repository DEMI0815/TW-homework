function bestCharge(selectedItems) {

  let halfMoney = 0;
  let offMoney = 0;
  let totalMoney = 0;
  let saleMoney = 0;
  let items = "";
  let halfName = "";
  for (let i = 0; i < selectedItems.length; i++) {
    let itemId = selectedItems[i].split(" x ")[0];
    let count = selectedItems[i].split(" x ")[1];
    if(isHalf(itemId)) {
      halfMoney += getPriceById(itemId) / 2 * count;
      i !== selectedItems.length - 1 ? halfName += getNameById(itemId) + "，" : halfName += getNameById(itemId);
    } else {
      halfMoney += getPriceById(itemId) * count;
    }
    offMoney += getPriceById(itemId) * count;
    totalMoney = offMoney;

    items += item(itemId, count);
  }

  if(offMoney >= 30)
    offMoney -= 6;

  if(halfMoney !== totalMoney && halfMoney < offMoney) {
    saleMoney = totalMoney - halfMoney;
    return "============= 订餐明细 =============\n" +
      items +
      "-----------------------------------\n" +
      "使用优惠:\n" +
      "指定菜品半价(" + halfName + ")，省" + saleMoney + "元\n" +
      "-----------------------------------\n" +
      "总计：" + halfMoney + "元\n" +
      "===================================";
  }

    if(offMoney !== totalMoney && halfMoney >= offMoney) {
      saleMoney = totalMoney - offMoney;
      return "============= 订餐明细 =============\n" +
        items +
        "-----------------------------------\n" +
        "使用优惠:\n" +
        "满30减6元，省" + saleMoney + "元\n" +
        "-----------------------------------\n" +
        "总计：" + offMoney + "元\n" +
        "===================================";
    }

  return "============= 订餐明细 =============\n" +
    items +
    "-----------------------------------\n" +
    "总计：" + totalMoney + "元\n" +
    "===================================";;
}

function item(id, count) {
  let name = getNameById(id);
  let totalPrice = getPriceById(id) * count;
  return name + " x " + count + " = " + totalPrice + "元\n";
}

function isHalf(id) {
  for (let j = 0; j < loadPromotions()[1].items.length; j++) {
    if (id === loadPromotions()[1].items[j])
      return true;
  }

  return false;
}

function getPriceById(id) {
  for(let i = 0; i < loadAllItems().length; i++) {
    if(id === loadAllItems()[i].id)
      return loadAllItems()[i].price;
  }
}

function getNameById(id) {
  for(let i = 0; i < loadAllItems().length; i++) {
    if(id === loadAllItems()[i].id)
      return loadAllItems()[i].name;
  }
}
