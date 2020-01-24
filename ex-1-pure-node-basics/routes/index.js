const addUser = require('./create-user');
const renderForm = require('./root');
const renderUsersList = require('./users');

const handleRequests = (req, res) => {
	const { method, url } = req;
	console.log(method, url);
	if (method === 'GET') {
		if (url === '/') {
			renderForm(res);
		}
		if (url === '/users') {
			renderUsersList(res);
		}
	}
	if (method === 'POST') {
		if (url === '/create-user') {
			addUser(req, res);
		}
	}
};

module.exports = handleRequests;
