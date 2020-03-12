const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
	uri: process.env.MONGODB_CONNSTRING,
	databaseName: process.env.MONGODB_DBNAME,
	collection: 'sessions'
});

module.exports = session({
	name: 'sessionId',
	resave: false,
	saveUninitialized: false,
	secret: process.env.SESSION_SECRET,
	store
});
