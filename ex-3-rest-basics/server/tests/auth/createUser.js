const useTestServer = require('../helpers/useTestServer');

const createUser = (mochaContext, { email, password, name } = {}) => {
	return chai
		.request(mochaContext.server)
		.post('/auth/signup')
		.send({ email, password, name });
};

describe('POST /auth/signup', function () {
	useTestServer();

	describe('a request with the invalid user input', function () {
		it('should fail with status code 422 if the email, password and content are missing', async function () {
			const res = await createUser(this);

			res.should.have.status(422);
			res.body.should.have.property('error', true);
			res.body.should.have
				.property('validationErrors')
				.that.has.all.keys('email', 'password', 'name');
		});

		it('should fail with status code 422 if the email is not a valid email', async function () {
			const res = await createUser(this, {
				email: 'not.an.email',
				password: 'test1',
				name: 'User'
			});

			res.should.have.status(422);
			res.body.should.have.property('error', true);
			res.body.should.have
				.property('validationErrors')
				.that.has.all.keys('email');
		});

		it('should fail with status code 422 if the password is too short', async function () {
			const res = await createUser(this, {
				email: 'test@test.com',
				password: 'test',
				name: 'User'
			});

			res.should.have.status(422);
			res.body.should.have.property('error', true);
			res.body.should.have
				.property('validationErrors')
				.that.has.all.keys('password');
		});
	});

	describe('a request with the valid user input', function () {
		it('should fail with status code 422 if the email is already in use', async function () {
			const usersDb = await this.mongoose.connection.db.collection('users');

			await usersDb.insertOne({
				email: 'test@test.com',
				password: 'test1',
				name: 'Existing'
			});

			const res = await createUser(this, {
				email: 'test@test.com',
				password: 'test1',
				name: 'New'
			});

			res.should.have.status(422);
			res.body.should.have.property('error', true);
			res.body.should.have
				.property('validationErrors')
				.that.has.all.keys('email');
		});

		it('should create a new user', async function () {
			const userInput = {
				email: 'test@test.com',
				password: 'password',
				name: 'User'
			};

			const res = await createUser(this, userInput);

			res.should.have.status(201);
			res.body.should.not.have.property('error');
			res.body.should.have.property('user').that.satisfies(user => {
				user.should.have.property('_id').that.is.a('string');
				user.should.have.property('email', userInput.email);
				user.should.have.property('name', userInput.name);
				user.should.have.property('createdAt').that.is.a('string');
				user.should.have.property('updatedAt').that.is.a('string');
				user.createdAt.should.equal(user.updatedAt);
				user.should.not.have.property('password');
				return true;
			});
		});
	});
});
