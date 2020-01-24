const fs = require('fs');
const qs = require('querystring');

const addUser = (req, res) => {
	const body = [];
	req.on('data', chunk => body.push(chunk));
	req.on('end', () => {
		const { username } = qs.parse(body.toString());
		fs.appendFile('users.txt', `\r\n${username}`, err => {
			if (err) {
				res.setHeader('Content-Type', 'text/plain');
				res.statusCode = 500;
				return res.send('An error occurred, please try again later.');
			}

			res.setHeader('Location', '/users');
			res.statusCode = 301;
			res.end();
		});
	});
};

module.exports = addUser;
