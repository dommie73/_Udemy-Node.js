const { MongoClient } = require('mongodb');

const { logError, logSuccess } = require('../utils/helpers');

const establishMongoConnection = async callback => {
	try {
		await MongoClient.connect(process.env.MONGODB_CONNSTRING, {
			useUnifiedTopology: true
		});

		logSuccess(
			`[mongodb] Connected to ${process.env.MONGODB_CLUSTERNAME} cluster`
		);

		if (callback instanceof Function) {
			callback();
		}
	} catch (error) {
		logError(`[mongodb] ${error}`);
	}
};

module.exports = establishMongoConnection;
