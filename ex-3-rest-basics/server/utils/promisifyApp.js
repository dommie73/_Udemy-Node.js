const debug = require('debug')('app:main');

const listenAsync = (app, port) => {
	return new Promise((resolve, reject) => {
		const server = app
			.listen(port)
			.once('listening', () => {
				debug('listening on port %d', server.address().port);
				resolve(server);
			})
			.once('error', reject);
	});
};

const closeAsync = server => {
	return new Promise((resolve, reject) => {
		server
			.close()
			.once('close', () => {
				debug('server stopped');
				resolve();
			})
			.once('error', reject);
	});
};

module.exports = {
	listenAsync,
	closeAsync
};
