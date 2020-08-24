const debug = require('debug')('app:main');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const connectToDb = require('./database');
const middlewares = require('./middlewares');
const schema = require('./graphql');
const { formatError: customFormatErrorFn } = require('./utils/graphql');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use(middlewares.cors);
app.use(middlewares.authJwt);

app.use('/graphql', (req, res) =>
	graphqlHTTP({
		graphiql: true,
		schema,
		customFormatErrorFn,
		context: {
			isAuthenticated: req.isAuthenticated,
			user: req.user
		}
	})(req, res)
);
app.post('/image-upload', middlewares.imageUpload('image'));

app.use(middlewares.notFoundHandler);
app.use(middlewares.errorHandler);

connectToDb().then(() => {
	const listener = app.listen(process.env.PORT, () => {
		debug('listening on port %d', listener.address().port);
	});
});
