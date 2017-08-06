import {Product} from "./product"
import {Helpers} from "./libs/helpers"

export class ProductRepository{
	private products: Product[] = [];

	constructor(){
		this.addItem(new Product(100, "sp1", "bulbasaur.png", "Lorem ipsum dolor sit amet", 20));
		this.addItem(new Product(101, "sp2", "charmander.png", "Lorem ipsum dolor sit amet", 21));
		this.addItem(new Product(102, "sp3", "ivysaur.png", "Lorem ipsum dolor sit amet", 22));
		this.addItem(new Product(103, "sp4", "squirtle.png", "Lorem ipsum dolor sit amet", 20));
		this.addItem(new Product(104, "sp5", "venusaur.png", "Lorem ipsum dolor sit amet", 24, false));
	}

	public addItem(product: Product){
		//this.products.push(product);
		this.products[this.products.length] = product;
	}

	public getItems(): Product[]{
		return this.products;
	}

	public getItemByID(id: number): Product{
		//case 1
		for(let i: number = 0; i < this.products.length; i++){
			if(this.products[i].id == id)
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

	public showItemsInHTML(): string{
		let total: number = this.products.length;
		let xhtmlResult: string = "";
		if(total > 0){
			for(let i: number = 0; i < total; i++){
				let currentItem: Product = this.products[i];
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
		}else{
			xhtmlResult = "Empty is product";
		}
	
		return xhtmlResult;
	}

	private showBuyItemInHTML(product: Product): string{
		let xhtmlResult = "";

		if(product.canBuy == true){
			xhtmlResult = ` <input type="number" name="quantity-product-${product.id}" value="1" min="1">
						    <a href="#" data-product="${product.id}" class="price">${Helpers.toCurrency(product.price, 'USD')} </a>`;
		}else{
			xhtmlResult = `<span class="price">${Helpers.toCurrency(product.price, 'USD', 'right')}</span>`;
		}

		return xhtmlResult;
	}
}