const { authenticateUser, useImages, useTestServer } = require('../helpers');

const getPosts = (mochaContext, token, page) => {
	const request = chai
		.request(mochaContext.server)
		.get('/feed/posts')
		.set('Authorization', `Bearer ${token}`);

	if (page) {
		request.query({ page });
	}

	return request;
};

describe('GET /feed/posts', function () {
	useTestServer();
	useImages();

	let user;
	let newPost;
	let newerPost;
	let newestPost;

	beforeEach(async function () {
		user = await authenticateUser(this, {
			email: 'test@test.com',
			password: 'test1',
			name: 'User'
		});
	});

	beforeEach(async function () {
		const { buffer, name } = await this.images.getValid();

		const posts = await Promise.all(
			[...new Array(3)].map(async () => {
				const { body } = await chai
					.request(this.server)
					.post('/feed/posts')
					.set('Authorization', `Bearer ${user.token}`)
					.field('title', 'A valid title')
					.field('content', 'A long-enough content')
					.attach('image', buffer, name);

				return body.post;
			})
		);

		[newPost, newerPost, newestPost] = posts.sort(
			(a, b) => new Date(a.createdAt) - new Date(b.createdAt)
		);
	});

	it('should fail with status code 401 if the user is not authenticated', async function () {
		const res = await getPosts(this, null);

		res.should.have.status(401);
		res.body.should.have.property('error', true);
	});

	it('should return the first page of posts if no page is specified', async function () {
		const res = await getPosts(this, user.token);

		res.should.have.status(200);
		res.body.should.not.have.property('error');
		res.body.should.have.property('totalItems', 3);
		res.body.should.have.property('totalPages', 2);
		res.body.should.have
			.property('posts')
			.that.deep.equals([newestPost, newerPost]);
	});

	it('should return the first page of posts if the specified page is not a number', async function () {
		const res = await getPosts(this, user.token, 'one');

		res.should.have.status(200);
		res.body.should.not.have.property('error');
		res.body.should.have.property('totalItems', 3);
		res.body.should.have.property('totalPages', 2);
		res.body.should.have
			.property('posts')
			.that.deep.equals([newestPost, newerPost]);
	});

	it('should return the first page of posts if the specified page is not a positive integer', async function () {
		const res = await getPosts(this, user.token, -1.27);

		res.should.have.status(200);
		res.body.should.not.have.property('error');
		res.body.should.have.property('totalItems', 3);
		res.body.should.have.property('totalPages', 2);
		res.body.should.have
			.property('posts')
			.that.deep.equals([newestPost, newerPost]);
	});

	it('should return the requested page of posts if the specified page is an in-range integer', async function () {
		const res = await getPosts(this, user.token, 2);

		res.should.have.status(200);
		res.body.should.not.have.property('error');
		res.body.should.have.property('totalItems', 3);
		res.body.should.have.property('totalPages', 2);
		res.body.should.have.property('posts').that.deep.equals([newPost]);
	});

	it('should return the empty array of posts if the specified page is greater than the number of total pages', async function () {
		const res = await getPosts(this, user.token, 3);

		res.should.have.status(200);
		res.body.should.not.have.property('error');
		res.body.should.have.property('totalItems', 3);
		res.body.should.have.property('totalPages', 2);
		res.body.should.have.property('posts').that.is.an('array').that.is.empty;
	});
});
