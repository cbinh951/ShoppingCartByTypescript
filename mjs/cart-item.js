"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./libs/helpers");
class CartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    showCartItemInHTML(index) {
        return `<tr>
					<th scope="row">${index}</td>
					<td>${this.product.name}</td>
					<td>${helpers_1.Helpers.toCurrency(this.product.price, '$', 'right')}</td>
					<td><input type="number" name="cart-item-quantity-${this.product.id}" value="${this.quantity}" min="1"></td>
					<td><strong>${helpers_1.Helpers.toCurrency(this.getSubtotal(), '$', 'right')}</strong></td>
					<td>
						<a href="#" class="btn btn-info btn-xs update-cart-item" data-product="${this.product.id}">Update</a>
						<a href="#" class="btn btn-danger btn-xs delete-cart-item" data-product="${this.product.id}">Delete</a>
					</td>
				</tr>`;
    }
    getSubtotal() {
        return this.product.price * this.quantity;
    }
    get product() {
        return this._product;
    }
    set product(v) {
        this._product = v;
    }
    get quantity() {
        return this._quantity;
    }
    set quantity(v) {
        this._quantity = v;
    }
}
exports.CartItem = CartItem;
