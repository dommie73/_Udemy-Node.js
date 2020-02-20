const path = require('path');

const Cart = require('./Cart');
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

	static async deleteById(id) {
		const products = await Product.fetchAll();
		const productToDelete = products.find(product => product.id === id);
		const updatedProducts = products.filter(product => product.id !== id);
		await Cart.deleteProduct(id, productToDelete.price);
		await Product.writeFile(updatedProducts);
	}

	static async fetchAll() {
		return await this.readFile();
	}

	static async fetchById(id) {
		const products = await this.readFile();
		return products.find(product => product.id === id);
	}

	async save(data = {}) {
		const products = await Product.fetchAll();

		if (this.hasOwnProperty('id')) {
			for (const [key, value] of Object.entries(data)) {
				this[key] = value;
			}
			const updatedProducts = products.map(product =>
				product.id === this.id ? this : product
			);
			return await Product.writeFile(updatedProducts);
		}

		this.id = Math.floor(Math.random() * 10 ** 8).toString();
		await Product.writeFile(products.concat({ ...this, price: +this.price }));
	}
}

module.exports = Product;
