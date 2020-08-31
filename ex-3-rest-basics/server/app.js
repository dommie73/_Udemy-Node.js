const express = require('express');

const connectToDb = require('./database');
const io = require('./websocket');
const middlewares = require('./middlewares');
const routes = require('./routes');
const { listenAsync } = require('./utils/promisifyApp');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use(middlewares.cors);

app.use('/auth', routes.auth);
app.use('/feed', routes.feed);

app.use(middlewares.notFoundHandler);
app.use(middlewares.errorHandler);

const runApp = async () => {
	const mongoose = await connectToDb();
	const server = await listenAsync(app, process.env.PORT);

	io.init(server);

	return { mongoose, server };
};

module.exports = { runApp };
