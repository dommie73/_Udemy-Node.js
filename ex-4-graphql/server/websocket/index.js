const socket = require('socket.io');

const io = {
	_io: null,

	get instance() {
		if (!this._io) {
			throw new ReferenceError('io has not been initialized!');
		}
		return this._io;
	},

	init(server) {
		this._io = socket(server, {
			cors: {
				methods: ['GET', 'POST'],
				origin: 'http://localhost:3000'
			}
		});
	}
};

module.exports = io;
