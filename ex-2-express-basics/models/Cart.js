const path = require('path');

const JSONFileManager = require('./JSONFileManager');

class Cart extends JSONFileManager {
	static _pathToJson = path.join('data', 'cart.json');

	static _updateProductsQty(products, id) {
		const productQty = products[id] || 0;

		return {
			...products,
			[id]: productQty + 1
		};
	}

	static _updateTotalPrice(totalPrice, price) {
		return +(totalPrice + price).toFixed(2);
	}

	static async addProduct(id, price) {
		const { products, totalPrice } = await this.fetch();
		const updatedProducts = this._updateProductsQty(products, id);
		const updatedTotalPrice = this._updateTotalPrice(totalPrice, price);

		await this.writeFile({
			products: updatedProducts,
			totalPrice: updatedTotalPrice
		});
	}

	static async deleteProduct(id, price) {
		const { products, totalPrice } = await this.fetch();
		const productQty = products[id] || 0;
		const updatedTotalPrice = this._updateTotalPrice(
			totalPrice,
			-1 * productQty * price
		);

		delete products[id];
		await this.writeFile({
			products,
			totalPrice: updatedTotalPrice
		});
	}

	static async fetch() {
		return await this.readFile();
	}
}

module.exports = Cart;
