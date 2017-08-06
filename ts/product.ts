export class Product{
	private _id: number;
	private _name: string;
	private _image: string;
	private _summary: string;
	private _price: number;
	private _canBuy: boolean;

	constructor(id: number, name: string, image: string, summary: string, price: number, canBuy: boolean = true){
		this._id = id;
		this._name = name;
		this._image = image;
		this._summary = summary;
		this._price = price;
		this._canBuy = canBuy;
	}
	
	public set id(v : number) {
		this._id = v;
	}

	public get id() : number {
		return this._id;
	}

	public set name(v : string) {
		this._name = v;
	}

	public get name() : string {
		return this._name;
	}

	public set image(v : string) {
		this._image = v;
	}

	public get image() : string {
		return this._image;
	}

	public set summary(v : string) {
		this._summary = v;
	}

	public get summary() : string {
		return this._summary;
	}

	public set price(v : number) {
		this._price = v;
	}

	public get price() : number {
		return this._price;
	}

	public set canBuy(v : boolean) {
		this._canBuy = v;
	}

	public get canBuy() : boolean {
		return this._canBuy;
	}
}