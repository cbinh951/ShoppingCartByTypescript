import { ProductRepository } from './product-repository';
import { Product } from './product';
import { Cart  } from './cart';
import { Validate } from './libs/validate';

namespace MELEMENT{
	export const ELM_LIST_PRODUCT = "#list-product";
	export const ELM_NOTIFICATION = "#mnotification";
	export const ELM_CART_BODY = "#my-cart-body";
	export const ELM_CART_FOOTER = "#my-cart-footer";
}

namespace MNOTIFICATION{
	export const NOTI_READY = "Ready to buy product";
	export const NOTI_GREATER_THAN_ONE = "Quantity must equal or greater than 1";
	export const NOTI_ADD = "Add success!";
	export const NOTI_UPDATE = "Update success!";
	export const NOTI_DELETE = "Delete success!";
}

let productReponsitory = new ProductRepository();
let cartObj = new Cart();
let products: Product[] = productReponsitory.getItems();

//console.log(productReponsitory.getItemByID(103));

function showListProduct(): void{
	$(MELEMENT.ELM_LIST_PRODUCT).html(productReponsitory.showItemsInHTML());
}

function showNotification(str: string): void{
	$(MELEMENT.ELM_NOTIFICATION).html(str);
}

function showCart(): void{
	$(MELEMENT.ELM_CART_BODY).html(cartObj.showCartBodyInHTML());
	$(MELEMENT.ELM_CART_FOOTER).html(cartObj.showCartHeaderInHTML());

}

function addProduct(quantity: number, id: number){
	if(Validate.checkQuantity(quantity) == true){
		let product: Product = productReponsitory.getItemByID(id);
		cartObj.addProduct(product, quantity);
		showCart();
		showNotification(MNOTIFICATION.NOTI_ADD);

	}else{
		showNotification(MNOTIFICATION.NOTI_GREATER_THAN_ONE);
	}
}

function updateProduct(quantity: number, id: number){
	if(Validate.checkQuantity(quantity) == true){
		let product: Product = productReponsitory.getItemByID(id);
		cartObj.updateProduct(product, quantity);
		showCart();
		showNotification(MNOTIFICATION.NOTI_UPDATE);

	}else{
		showNotification(MNOTIFICATION.NOTI_GREATER_THAN_ONE);
	}
}

function deleteProduct(id: number){
	let product: Product = productReponsitory.getItemByID(id);
	cartObj.removeProduct(product);
	showCart();
	showNotification(MNOTIFICATION.NOTI_DELETE);
}

$(document).ready(function(){
	console.log("test thu thoi");
	//Hiển thị danh sách sản phẩm
	showListProduct();
	//giỏ hàng rỗng
	showCart();
	//Cập nhật thông báo
	showNotification(MNOTIFICATION.NOTI_READY);

	//Mua san pham
	$(".price").click(function(){
		let id: number = $(this).data("product");
		let quantity: number = parseInt($("input[name='quantity-product-"+ id +"']").val());
		addProduct(quantity, id);
	});

	//Update san pham
	$(document).on("click", "a.update-cart-item", function(){
		let id: number = $(this).data("product");
		let quantity: number = parseInt($("input[name='cart-item-quantity-"+ id +"']").val());
		updateProduct(quantity, id);
	});

	//Delete san pham
	$(document).on("click", "a.delete-cart-item", function(){
		let id: number = $(this).data("product");
		deleteProduct(id);
	});

});