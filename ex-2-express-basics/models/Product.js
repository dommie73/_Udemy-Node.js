const { ObjectId } = require('mongodb');

const mongo = require('../database');

class Product {
	constructor(name, imageUrl, price, description) {
		this.name = name;
		this.imageUrl = imageUrl;
		this.price = +price;
		this.description = description;
	}

	static fetchAll() {
		return mongo.db
			.collection('products')
			.find()
			.toArray();
	}

	static fetchById(id) {
		return mongo.db.collection('products').findOne({ _id: ObjectId(id) });
	}

	save() {
		return mongo.db.collection('products').insertOne(this);
	}
}

module.exports = Product;
