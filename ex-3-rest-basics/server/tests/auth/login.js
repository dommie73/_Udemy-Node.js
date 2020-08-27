const useTestServer = require('../helpers/useTestServer');

const login = (mochaContext, { email, password } = {}) => {
	return chai
		.request(mochaContext.server)
		.post('/auth/login')
		.send({ email, password });
};

describe('POST /auth/login', function () {
	useTestServer();

	const userData = {
		email: 'test@test.com',
		password: 'test1',
		name: 'User'
	};
	let user;

	beforeEach(async function () {
		const { body } = await chai
			.request(this.server)
			.post('/auth/signup')
			.send(userData);

		user = body.user;
	});

	it("should fail with status code 401 if the account doesn't exist", async function () {
		const res = await login(this, {
			email: 'admin@test.com',
			password: 'test1'
		});

		res.should.have.status(401);
		res.body.should.have.property('error', true);
	});

	it('should fail with status code 401 if the password is invalid', async function () {
		const res = await login(this, {
			email: userData.email,
			password: 'password'
		});

		res.should.have.status(401);
		res.body.should.have.property('error', true);
	});

	it('should return user ID and token for valid credentials', async function () {
		const res = await login(this, {
			email: userData.email,
			password: userData.password
		});

		res.should.have.status(200);
		res.body.should.not.have.property('error');
		res.body.should.have.property('userId', user._id);
		res.body.should.have.property('token').that.is.a('string');
	});
});
