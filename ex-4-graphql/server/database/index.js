const mongoose = require('mongoose');
const debug = require('debug')('mongoose:connection');

const connect = () =>
	mongoose
		.connect(process.env.MONGODB_CONNSTRING, {
			dbName: process.env.MONGODB_DBNAME,
			useCreateIndex: true,
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(mongoose => {
			debug('%s', `connected to ${mongoose.connection.host}`);
			return mongoose;
		})
		.catch(error => {
			debug('%s', error.message);
			throw error;
		});

module.exports = connect;
