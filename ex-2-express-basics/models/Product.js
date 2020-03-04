const { ObjectId } = require('mongodb');

const mongo = require('../database');

class Product {
	constructor(name, imageUrl, price, description, id, userId) {
		this.name = name;
		this.imageUrl = imageUrl;
		this.price = +price;
		this.description = description;
		this._id = id ? ObjectId(id) : null;
		this.userId = userId ? ObjectId(userId) : null;
	}

	static deleteById(id) {
		return mongo.db.collection('products').deleteOne({ _id: ObjectId(id) });
	}

	static fetchAll(query = {}) {
		return mongo.db
			.collection('products')
			.find(query)
			.toArray();
	}

	static fetchById(id) {
		return mongo.db.collection('products').findOne({ _id: ObjectId(id) });
	}

	save() {
		if (this._id) {
			return mongo.db
				.collection('products')
				.updateOne({ _id: this._id }, { $set: this });
		}
		return mongo.db.collection('products').insertOne(this);
	}
}

module.exports = Product;
