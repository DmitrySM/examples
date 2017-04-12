/*
 * Шаблон Декоратор
 * Пример: декорирование цены покупки
 */
function Sale(price) {
    this.price = (price > 0) || 100;
    this.decorators_list = [];
}

Sale.decorators = {};

Sale.decorators.fedtax = {
    getPrice: function(price) {
        return price + price * 5 / 100;
    }
};

Sale.decorators.quebec = {
    getPrice: function(price) {
        return price + price * 7.5 / 100;
    }
};

Sale.decorators.money = {
    getPrice: function(price) {
        return "$" + price.toFixed(2);
    }
};

Sale.prototype.decorete = function(decoretor) {
    this.decorators_list.push(decoretor);
};

Sale.prototype.getPrice = function() {
    var price = this.price,
        i,
        max = this.decorators_list.length,
        name;
    for (i = 0; i < max; i += 1) {
        name = this.decorators_list[i];
        price = Sale.decorators[name].getPrice(price);
    }
    return price;
};

/************Пример*********************/
var sale = new Sale(100); //  цена 100$
sale.decorete('fedtax'); // добавить федеральный налог
sale.decorete('quebec'); // добавить местный налог
sale.decorete('money'); // форматировать как местный налог
console.log(sale.getPrice());

var sale2 = new Sale(100); //  цена 100$
sale2.decorete('fedtax'); // добавить федеральный налог
console.log(sale2.getPrice());
