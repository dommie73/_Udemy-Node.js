const http = require('http');

const handleRequests = require('./routes');

const server = http.createServer((req, res) => {
	handleRequests(req, res);
});

server.listen(8080);
