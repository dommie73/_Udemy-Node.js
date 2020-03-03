const { ObjectId } = require('mongodb');

const mongo = require('../database');

class User {
	constructor(name, email, id) {
		this.name = name;
		this.email = email;
		this._id = id ? ObjectId(id) : null;
	}

	static fetchById(id) {
		return mongo.db.collection('users').findOne({ _id: ObjectId(id) });
	}

	save() {
		return mongo.db.collection('users').insertOne(this);
	}
}

module.exports = User;
