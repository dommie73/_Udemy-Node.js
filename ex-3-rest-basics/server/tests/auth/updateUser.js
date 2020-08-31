const { authenticateUser, useTestServer } = require('../helpers');

const updateUser = (mochaContext, token, { status } = {}) => {
	const request = chai
		.request(mochaContext.server)
		.patch('/auth')
		.set('Authorization', `Bearer ${token}`);

	if (status) {
		request.send({ status });
	}

	return request;
};

describe('PATCH /auth', function () {
	useTestServer();

	let originalUser;

	beforeEach(async function () {
		originalUser = await authenticateUser(this, {
			email: 'test@test.com',
			password: 'test1',
			name: 'User'
		});
	});

	describe('a request with the invalid user input', function () {
		it('should fail with status code 401 if the user is not authenticated', async function () {
			const res = await updateUser(this, null);

			res.should.have.status(401);
			res.body.should.have.property('error', true);
		});

		it('should fail with status code 422 if the user status is missing', async function () {
			const res = await updateUser(this, originalUser.token);

			res.should.have.status(422);
			res.body.should.have.property('error', true);
			res.body.should.have
				.property('validationErrors')
				.that.has.all.keys('status');
		});

		it('should fail with status code 422 if the user status is an empty string', async function () {
			const res = await updateUser(this, originalUser.token);

			res.should.have.status(422);
			res.body.should.have.property('error', true);
			res.body.should.have
				.property('validationErrors')
				.that.has.all.keys('status');
		});
	});

	describe('a request with the valid user input', function () {
		const status = 'Test status';

		it('should fail with status code 401 if the user is not authenticated', async function () {
			const res = await updateUser(this, null, { status });

			res.should.have.status(401);
			res.body.should.have.property('error', true);
		});

		it("should update the user's status", async function () {
			const res = await updateUser(this, originalUser.token, { status });

			res.should.have.status(200);
			res.body.should.not.have.property('error');
			res.body.should.have.property('user').that.satisfies(user => {
				user.should.have.property('_id', originalUser.data._id);
				user.should.have.property('email', originalUser.data.email);
				user.should.have.property('name', originalUser.data.name);
				user.should.have.property('status', status);
				user.should.have.property('createdAt').that.is.a('string');
				user.should.have.property('updatedAt').that.is.a('string');
				user.should.not.have.property('password');
				user.createdAt.should.not.equal(user.updatedAt);
				new Date(user.updatedAt).valueOf().should.be.closeTo(Date.now(), 1000);
				return true;
			});
		});
	});
});
