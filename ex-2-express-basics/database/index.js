const { MongoClient } = require('mongodb');

const { logError, logSuccess } = require('../utils/helpers');

class Mongo {
	constructor(connectionString) {
		this._client = new MongoClient(connectionString, {
			useUnifiedTopology: true
		});
		this._db = null;
	}

	async connect(callback) {
		try {
			await this._client.connect();
			this._db = this._client.db(process.env.MONGODB_DBNAME);

			logSuccess(`[mongodb] Connected to ${this._client.s.options.srvHost}`);

			if (callback instanceof Function) {
				callback();
			}
		} catch (error) {
			logError(`[mongodb] ${error}`);
		}
	}

	get db() {
		if (!this._db) {
			throw new Error('No open connections');
		}
		return this._db;
	}
}

const mongo = new Mongo(process.env.MONGODB_CONNSTRING);

module.exports = mongo;
