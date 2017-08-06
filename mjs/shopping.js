"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_repository_1 = require("./product-repository");
const cart_1 = require("./cart");
const validate_1 = require("./libs/validate");
var MELEMENT;
(function (MELEMENT) {
    MELEMENT.ELM_LIST_PRODUCT = "#list-product";
    MELEMENT.ELM_NOTIFICATION = "#mnotification";
    MELEMENT.ELM_CART_BODY = "#my-cart-body";
    MELEMENT.ELM_CART_FOOTER = "#my-cart-footer";
})(MELEMENT || (MELEMENT = {}));
var MNOTIFICATION;
(function (MNOTIFICATION) {
    MNOTIFICATION.NOTI_READY = "Ready to buy product";
    MNOTIFICATION.NOTI_GREATER_THAN_ONE = "Quantity must equal or greater than 1";
    MNOTIFICATION.NOTI_ADD = "Add success!";
    MNOTIFICATION.NOTI_UPDATE = "Update success!";
    MNOTIFICATION.NOTI_DELETE = "Delete success!";
})(MNOTIFICATION || (MNOTIFICATION = {}));
let productReponsitory = new product_repository_1.ProductRepository();
let cartObj = new cart_1.Cart();
let products = productReponsitory.getItems();
//console.log(productReponsitory.getItemByID(103));
function showListProduct() {
    $(MELEMENT.ELM_LIST_PRODUCT).html(productReponsitory.showItemsInHTML());
}
function showNotification(str) {
    $(MELEMENT.ELM_NOTIFICATION).html(str);
}
function showCart() {
    $(MELEMENT.ELM_CART_BODY).html(cartObj.showCartBodyInHTML());
    $(MELEMENT.ELM_CART_FOOTER).html(cartObj.showCartHeaderInHTML());
}
function addProduct(quantity, id) {
    if (validate_1.Validate.checkQuantity(quantity) == true) {
        let product = productReponsitory.getItemByID(id);
        cartObj.addProduct(product, quantity);
        showCart();
        showNotification(MNOTIFICATION.NOTI_ADD);
    }
    else {
        showNotification(MNOTIFICATION.NOTI_GREATER_THAN_ONE);
    }
}
function updateProduct(quantity, id) {
    if (validate_1.Validate.checkQuantity(quantity) == true) {
        let product = productReponsitory.getItemByID(id);
        cartObj.updateProduct(product, quantity);
        showCart();
        showNotification(MNOTIFICATION.NOTI_UPDATE);
    }
    else {
        showNotification(MNOTIFICATION.NOTI_GREATER_THAN_ONE);
    }
}
function deleteProduct(id) {
    let product = productReponsitory.getItemByID(id);
    cartObj.removeProduct(product);
    showCart();
    showNotification(MNOTIFICATION.NOTI_DELETE);
}
$(document).ready(function () {
    //Hiển thị danh sách sản phẩm
    showListProduct();
    //giỏ hàng rỗng
    showCart();
    //Cập nhật thông báo
    showNotification(MNOTIFICATION.NOTI_READY);
    //Mua san pham
    $(".price").click(function () {
        let id = $(this).data("product");
        let quantity = parseInt($("input[name='quantity-product-" + id + "']").val());
        addProduct(quantity, id);
    });
    //Update san pham
    $(document).on("click", "a.update-cart-item", function () {
        let id = $(this).data("product");
        let quantity = parseInt($("input[name='cart-item-quantity-" + id + "']").val());
        updateProduct(quantity, id);
    });
    //Delete san pham
    $(document).on("click", "a.delete-cart-item", function () {
        let id = $(this).data("product");
        deleteProduct(id);
    });
});
