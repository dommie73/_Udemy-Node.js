const debug = require('debug')('app:main');
const express = require('express');

const app = express();

const listener = app.listen(process.env.PORT, () => {
	debug('listening on port %d', listener.address().port);
});
