const fs = require('fs');
const path = require('path');

class Product {
	constructor(name, imageUrl, price, description) {
		this.name = name;
		this.imageUrl = imageUrl;
		this.price = price;
		this.description = description;
	}

	static _pathToJson = path.join(
		path.dirname(process.mainModule.filename),
		'data',
		'products.json'
	);

	static _parseJSONProductData(data) {
		return JSON.parse(data, (key, value) => {
			if (Array.isArray(value)) {
				value.forEach(product => {
					Product._setProductPrototype(product);
				});
			}
			return value;
		});
	}

	static _setProductPrototype(product) {
		return Object.setPrototypeOf(product, Product.prototype);
	}

	static async _readFile() {
		const products = await new Promise((resolve, reject) => {
			return fs.readFile(Product._pathToJson, (error, data) => {
				if (error) {
					return reject(error);
				}
				return resolve(Product._parseJSONProductData(data));
			});
		});

		return products;
	}

	static async _writeFile(data) {
		return new Promise((resolve, reject) => {
			return fs.writeFile(
				Product._pathToJson,
				JSON.stringify(data, null, 2),
				error => {
					if (error) {
						return reject(error);
					}
					return resolve(`Saved to ${Product._pathToJson}`);
				}
			);
		});
	}

	static async fetchAll() {
		return await Product._readFile();
	}

	async save() {
		this.id = Math.floor(Math.random() * 10 ** 8).toString();
		const products = await Product._readFile();
		await Product._writeFile(products.concat(this));
	}
}

module.exports = Product;
