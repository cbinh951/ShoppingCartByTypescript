"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("./product");
const helpers_1 = require("./libs/helpers");
class ProductRepository {
    constructor() {
        this.products = [];
        this.addItem(new product_1.Product(100, "sp1", "bulbasaur.png", "Lorem ipsum dolor sit amet", 20));
        this.addItem(new product_1.Product(101, "sp2", "charmander.png", "Lorem ipsum dolor sit amet", 21));
        this.addItem(new product_1.Product(102, "sp3", "ivysaur.png", "Lorem ipsum dolor sit amet", 22));
        this.addItem(new product_1.Product(103, "sp4", "squirtle.png", "Lorem ipsum dolor sit amet", 20));
        this.addItem(new product_1.Product(104, "sp5", "venusaur.png", "Lorem ipsum dolor sit amet", 24, false));
    }
    addItem(product) {
        //this.products.push(product);
        this.products[this.products.length] = product;
    }
    getItems() {
        return this.products;
    }
    getItemByID(id) {
        //case 1
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id)
                return this.products[i];
        }
        return null;
        //case 2
        // let fillter : Product[] = this.products.filter(
        // 	product => product.id == id
        // );
        // if(fillter.length > 0) return fillter[0];
        // return null;
    }
    showItemsInHTML() {
        let total = this.products.length;
        let xhtmlResult = "";
        if (total > 0) {
            for (let i = 0; i < total; i++) {
                let currentItem = this.products[i];
                xhtmlResult += `<div class="media product">
						  <div class="media-left">
						  	<a href="#">
						    	<img src="img/characters/${currentItem.image}" class="media-object">
						    </a>
						  </div>
						  <div class="media-body">
						    <h4 class="media-heading">${currentItem.name}</h4>
						    <p>${currentItem.summary}</p>
						   		${this.showBuyItemInHTML(currentItem)}
						  </div>
						</div>`;
            }
        }
        else {
            xhtmlResult = "Empty is product";
        }
        return xhtmlResult;
    }
    showBuyItemInHTML(product) {
        let xhtmlResult = "";
        if (product.canBuy == true) {
            xhtmlResult = ` <input type="number" name="quantity-product-${product.id}" value="1" min="1">
						    <a href="#" data-product="${product.id}" class="price">${helpers_1.Helpers.toCurrency(product.price, 'USD')} </a>`;
        }
        else {
            xhtmlResult = `<span class="price">${helpers_1.Helpers.toCurrency(product.price, 'USD', 'right')}</span>`;
        }
        return xhtmlResult;
    }
}
exports.ProductRepository = ProductRepository;
