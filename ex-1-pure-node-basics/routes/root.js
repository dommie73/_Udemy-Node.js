const renderForm = res => {
	res.setHeader('Content-Type', 'text/html');
	res.write(`
    <html>
      <head>
        <title>Create User</title>
      </head>
      <body>
        <form action="/create-user" method="POST">
          <input type="text" name="username" placeholder="Username">
          <button type="submit">Add User</button>
        </form>
      </body>
    </html>
  `);
	res.end();
};

module.exports = renderForm;
