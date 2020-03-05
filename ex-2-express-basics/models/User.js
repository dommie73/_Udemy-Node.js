const { ObjectId } = require('mongodb');

const mongo = require('../database');

class User {
	constructor(name, email, id, cart = { products: {} }) {
		this.name = name;
		this.email = email;
		this._id = id ? ObjectId(id) : null;
		this.cart = cart;
	}

	static defaultId = '5e5edf4325e1d120d896d4c8';

	static fetchById(id) {
		return mongo.db.collection('users').findOne({ _id: ObjectId(id) });
	}

	_emptyCart() {
		this.cart.products = {};
	}

	_updateCart() {
		return mongo.db
			.collection('users')
			.updateOne({ _id: this._id }, { $set: { cart: this.cart } });
	}

	addToCart(product) {
		const { products } = this.cart;
		if (products.hasOwnProperty(product._id)) {
			const { quantity } = products[product._id];
			products[product._id] = { quantity: quantity + 1 };
		} else {
			products[product._id] = { quantity: 1 };
		}

		if (!this._id) {
			return this.save();
		}

		return this._updateCart();
	}

	createOrder() {
		return this.getCart().then(cart =>
			mongo.db
				.collection('orders')
				.insertOne({ ...cart, userId: this._id })
				.then(() => {
					this._emptyCart();
					this._updateCart();
				})
		);
	}

	deleteFromCart(productId) {
		const { products } = this.cart;

		delete products[productId];
		return this._updateCart();
	}

	getCart() {
		const productIds = Object.keys(this.cart.products);
		return mongo.db
			.collection('products')
			.find({ _id: { $in: productIds.map(ObjectId) } })
			.toArray()
			.then(products => {
				if (Object.keys(this.cart.products).length !== products.length) {
					const foundProductIds = products.map(product =>
						product._id.toString()
					);

					for (const productId in this.cart.products) {
						if (!foundProductIds.includes(productId)) {
							this.deleteFromCart(productId);
						}
					}
				}

				return products;
			})
			.then(products =>
				products.map(product => ({
					...product,
					quantity: this.cart.products[product._id].quantity
				}))
			)
			.then(products => ({
				products,
				totalPrice: +products
					.reduce((sum, product) => sum + product.price * product.quantity, 0)
					.toFixed(2)
			}));
	}

	getOrders() {
		return mongo.db
			.collection('orders')
			.find({ userId: this._id })
			.toArray();
	}

	save() {
		return mongo.db.collection('users').insertOne(this);
	}
}

module.exports = User;
