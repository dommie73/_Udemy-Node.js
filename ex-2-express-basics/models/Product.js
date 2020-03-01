const mongo = require('../database');

class Product {
	constructor(name, imageUrl, price, description) {
		this.name = name;
		this.imageUrl = imageUrl;
		this.price = +price;
		this.description = description;
	}

	save() {
		const { db } = mongo;
		return db.collection('products').insertOne(this);
	}
}

module.exports = Product;
