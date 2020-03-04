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

		return mongo.db
			.collection('users')
			.updateOne({ _id: this._id }, { $set: { cart: this.cart } });
	}

	save() {
		return mongo.db.collection('users').insertOne(this);
	}
}

module.exports = User;
