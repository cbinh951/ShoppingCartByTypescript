"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(id, name, image, summary, price, canBuy = true) {
        this._id = id;
        this._name = name;
        this._image = image;
        this._summary = summary;
        this._price = price;
        this._canBuy = canBuy;
    }
    set id(v) {
        this._id = v;
    }
    get id() {
        return this._id;
    }
    set name(v) {
        this._name = v;
    }
    get name() {
        return this._name;
    }
    set image(v) {
        this._image = v;
    }
    get image() {
        return this._image;
    }
    set summary(v) {
        this._summary = v;
    }
    get summary() {
        return this._summary;
    }
    set price(v) {
        this._price = v;
    }
    get price() {
        return this._price;
    }
    set canBuy(v) {
        this._canBuy = v;
    }
    get canBuy() {
        return this._canBuy;
    }
}
exports.Product = Product;
