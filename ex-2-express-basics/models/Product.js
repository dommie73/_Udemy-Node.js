const path = require('path');

const JSONFileManager = require('./JSONFileManager');

class Product extends JSONFileManager {
	static _pathToJson = path.join('data', 'products.json');

	constructor(name, imageUrl, price, description) {
		super();
		this.name = name;
		this.imageUrl = imageUrl;
		this.price = price;
		this.description = description;
	}

	static parseJSONData(data) {
		return JSON.parse(data, (key, value) => {
			if (Array.isArray(value)) {
				value.forEach(product => {
					Object.setPrototypeOf(product, this.prototype);
				});
			}
			return value;
		});
	}

	static async fetchAll() {
		return await this.readFile();
	}

	static async fetchById(id) {
		const products = await this.readFile();
		return products.find(product => product.id === id);
	}

	async save() {
		this.id = Math.floor(Math.random() * 10 ** 8).toString();
		const products = await Product.readFile();
		await Product.writeFile(products.concat({ ...this, price: +this.price }));
	}
}

module.exports = Product;
