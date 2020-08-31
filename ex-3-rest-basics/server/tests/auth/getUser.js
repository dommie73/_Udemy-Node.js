const { authenticateUser, useTestServer } = require('../helpers');

const getUser = (mochaContext, token) => {
	return chai
		.request(mochaContext.server)
		.get('/auth')
		.set('Authorization', `Bearer ${token}`);
};

describe('GET /auth', function () {
	useTestServer();

	let user;

	beforeEach(async function () {
		user = await authenticateUser(this, {
			email: 'test@test.com',
			password: 'test1',
			name: 'User'
		});
	});

	it('should fail with status code 401 if the user is not authenticated', async function () {
		const res = await getUser(this, null);

		res.should.have.status(401);
		res.body.should.have.property('error', true);
	});

	it('should fail with status code 401 if the token is invalid', async function () {
		const res = await getUser(this, 'malformed_token');

		res.should.have.status(401);
		res.body.should.have.property('error', true);
	});

	it("should fail with status code 404 if the user encoded in the token doesn't exist", async function () {
		const usersDb = await this.mongoose.connection.db.collection('users');

		await usersDb.deleteMany({});

		const res = await getUser(this, user.token);

		res.should.have.status(404);
		res.body.should.have.property('error', true);
	});

	it('should return the current user if the token is valid', async function () {
		const res = await getUser(this, user.token);

		res.should.have.status(200);
		res.body.should.not.have.property('error');
		res.body.should.have.property('user').that.deep.equals(user.data);
	});
});
