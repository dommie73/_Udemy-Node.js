const { authenticateUser, useImages, useTestServer } = require('../helpers');

const getPost = (mochaContext, token, id) => {
	return chai
		.request(mochaContext.server)
		.get(`/feed/posts/${id}`)
		.set('Authorization', `Bearer ${token}`);
};

describe('GET /feed/posts/:id', function () {
	useTestServer();
	useImages();

	let user;
	let post;

	beforeEach(async function () {
		user = await authenticateUser(this, {
			email: 'test@test.com',
			password: 'test1',
			name: 'User'
		});
	});

	beforeEach(async function () {
		const { buffer, name } = await this.images.getValid();
		const { body } = await chai
			.request(this.server)
			.post('/feed/posts')
			.set('Authorization', `Bearer ${user.token}`)
			.field('title', 'A valid title')
			.field('content', 'A long-enough content')
			.attach('image', buffer, name);

		post = body.post;
	});

	it('should fail with status code 401 if the user is not authenticated', async function () {
		const res = await getPost(this, null, post._id);

		res.should.have.status(401);
		res.body.should.have.property('error', true);
	});

	it('should fail with status code 404 if the post does not exist', async function () {
		const res = await getPost(this, user.token, 1);

		res.should.have.status(404);
		res.body.should.have.property('error', true);
	});

	it('should return the existing post', async function () {
		const res = await getPost(this, user.token, post._id);

		res.should.have.status(200);
		res.body.should.not.have.property('error');
		res.body.should.have.property('post').that.deep.equals(post);
	});
});
