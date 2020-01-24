const fs = require('fs');

const renderUsersList = res => {
	fs.readFile('users.txt', (err, data) => {
		if (err) {
			res.setHeader('Content-Type', 'text/plain');
			res.statusCode = 500;
			return res.send('An error occurred, please try again later.');
		}

		const usersArray = data.toString().split('\r\n');
		const usersHtml = usersArray.map(user => `<li>${user}</li>`).join('');

		res.setHeader('Content-Type', 'text/html');
		res.write(`
      <html>
        <head>
          <title>Users List</title>
        </head>
        <body>
          <ul>
            ${usersHtml}
          </ul>
        </body>
      </html>
    `);
		res.end();
	});
};

module.exports = renderUsersList;
