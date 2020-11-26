const chai = require('chai');

const authenticateUser = async function (
	mochaContext,
	{ email, password, name }
) {
	const { server } = mochaContext;

	await chai.request(server).post('/auth/signup').send({
		email,
		password,
		name
	});

	const { body: loginData } = await chai
		.request(server)
		.post('/auth/login')
		.send({
			email,
			password
		});
	const { token } = loginData;

	const { body: authData } = await chai
		.request(server)
		.get('/auth')
		.set('Authorization', `Bearer ${token}`);
	const { user } = authData;

	return { data: user, token };
};

module.exports = authenticateUser;
