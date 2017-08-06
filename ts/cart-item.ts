import {Product} from './product';
import {Helpers} from './libs/helpers';

export class CartItem{
	private _product: Product;
	private _quantity: number;

	constructor(product: Product, quantity: number){
		this.product = product;
		this.quantity = quantity;
	}

	public showCartItemInHTML(index : number): string{
		return `<tr>
					<th scope="row">${index}</td>
					<td>${this.product.name}</td>
					<td>${Helpers.toCurrency(this.product.price, '$', 'right')}</td>
					<td><input type="number" name="cart-item-quantity-${this.product.id}" value="${this.quantity}" min="1"></td>
					<td><strong>${Helpers.toCurrency(this.getSubtotal(), '$', 'right')}</strong></td>
					<td>
						<a href="#" class="btn btn-info btn-xs update-cart-item" data-product="${this.product.id}">Update</a>
						<a href="#" class="btn btn-danger btn-xs delete-cart-item" data-product="${this.product.id}">Delete</a>
					</td>
				</tr>`;
	}

	public getSubtotal(): number{
		return this.product.price * this.quantity;
	}

	public get product() : Product {
		return this._product;
	}

	public set product(v : Product) {
		this._product = v;
	}

	public get quantity() : number {
		return this._quantity
	}

	public set quantity(v : number) {
		this._quantity = v;
	}
}