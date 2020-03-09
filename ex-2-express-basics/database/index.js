const mongoose = require('mongoose');

const { logSuccess } = require('../utils/helpers');

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
			logSuccess(`[mongoose] connected to ${mongoose.connection.host}`);
			return mongoose;
		});

module.exports = connect;
