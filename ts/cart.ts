import {CartItem} from './cart-item';
import {Product} from './product';
import {Helpers} from './libs/helpers';

export class Cart{
	private cartItems: CartItem[] = [];
	private totalQuantity: number = 0;
	private totalPrice: number = 0;

	public addProduct(product: Product, quantity: number = 1): void{
		let position : number = this.getProductPosition(product);
		if(position > -1){
			this.cartItems[position].quantity += quantity;
		}else{
			this.cartItems[this.cartItems.length] = new CartItem(product, quantity);
		}
		this.totalQuantity += quantity;
		this.totalPrice += product.price * quantity;
	}

	private getProductPosition(product: Product) : number{
		let total: number = this.cartItems.length;
		for(let i : number = 0; i < total; i++){
			if(this.cartItems[i].product.id == product.id) return i;
		}
		return -1;
	}
	
	public updateProduct(product: Product, quantity: number = 1): void{
		/*
			a: 2 10
			b: 5 5
			total: 7 45

			a: 2 10
			b: 3 5
			total: 5 35

			total: 7 - (5 - 3) 45-5x(5-3)
		*/
		let position : number = this.getProductPosition(product);
		if(position > -1){
			this.totalQuantity = this.totalQuantity - (this.cartItems[position].quantity - quantity);
			this.totalPrice = this.totalPrice - product.price * (this.cartItems[position].quantity - quantity);
			this.cartItems[position].quantity = quantity;
		}
	}

	public removeProduct(product: Product): void{
		let position : number = this.getProductPosition(product);
		if(position > -1){
			this.totalQuantity = this.totalQuantity - (this.cartItems[position].quantity);
			this.totalPrice = this.totalPrice - product.price * this.cartItems[position].quantity;
			
			this.cartItems.splice(position, 1);
		}
	}

	public isEmpty(): boolean{
		return (this.cartItems.length == 0);
	}

	// public getTotalQuantity(): number{
	// 	let total : number = 0;
	// 	this.cartItems.forEach((cartItem: CartItem) => {
	// 		total += cartItem.quantity;
	// 	});
	// 	return total;
	// }

	// public getTotalPrice(): number{
	// 	let total : number = 0;
	// 	this.cartItems.forEach((cartItem: CartItem) => {
	// 		total += cartItem.quantity * cartItem.product.price;
	// 	});
	// 	return total;
	// }

	public showCartBodyInHTML(): string{
		let xhtml : string = ``;
		if(!this.isEmpty()){
			let total: number = this.cartItems.length;

			for(let i : number = 0; i < total; i++){
				let cartItemCurrent: CartItem = this.cartItems[i];
				xhtml += cartItemCurrent.showCartItemInHTML(i + 1);
			}
		}
		return xhtml;
	}


	public showCartHeaderInHTML(): string{
		let xhtml : string = `<tr><th colspan="6"> Empty product in your cart</th></tr>`;
		if(!this.isEmpty()){
			xhtml = `<tr>
					<td colspan="4">There are <b>${this.totalQuantity}</b> item in your shopping cart.</td>
					<td colspan="2" class="total-price text-left">${Helpers.toCurrency(this.totalPrice, 'USD', 'right')} </td> 
				</tr>`;
		}

		return xhtml;
	}
}