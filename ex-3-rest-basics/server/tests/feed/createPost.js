const { authenticateUser, useImages, useTestServer } = require('../helpers');

const createPost = (mochaContext, token, { title, content, image } = {}) => {
	const request = chai
		.request(mochaContext.server)
		.post('/feed/posts')
		.set('Authorization', `Bearer ${token}`);

	if (title) {
		request.field('title', title);
	}
	if (content) {
		request.field('content', content);
	}
	if (image) {
		request.attach('image', image.buffer, image.name);
	}
	return request;
};

describe('POST /feed/posts', function () {
	useTestServer();
	useImages();

	let user;

	beforeEach(async function () {
		user = await authenticateUser(this, {
			email: 'test@test.com',
			password: 'test1',
			name: 'User'
		});
	});

	describe('a request with the invalid post input', function () {
		it('should fail with status code 401 if the user is not authenticated', async function () {
			const res = await createPost(this, null);

			res.should.have.status(401);
			res.body.should.have.property('error', true);
		});

		it('should fail with status code 422 if the title and content are missing', async function () {
			const res = await createPost(this, user.token);

			res.should.have.status(422);
			res.body.should.have.property('error', true);
			res.body.should.have
				.property('validationErrors')
				.that.has.all.keys('title', 'content', 'image');
		});

		it('should fail with status code 422 if the title and content are too short', async function () {
			const res = await createPost(this, user.token, {
				title: 'test',
				content: 'test',
				image: await this.images.getValid()
			});

			res.should.have.status(422);
			res.body.should.have.property('error', true);
			res.body.should.have
				.property('validationErrors')
				.that.has.all.keys('title', 'content');
		});

		it('should fail with status code 422 if the provided file is not an image', async function () {
			const res = await createPost(this, user.token, {
				title: 'valid',
				content: 'valid',
				image: await this.images.getNonImage()
			});

			res.should.have.status(422);
			res.body.should.have.property('message', 'Invalid file type.');
			dir.should.be.empty;
		});

		it('should fail with status code 422 if the provided image is too large', async function () {
			const res = await createPost(this, user.token, {
				title: 'valid',
				content: 'valid',
				image: await this.images.getTooLarge()
			});

			res.should.have.status(422);
			res.body.should.have.property('message', 'File too large');
			dir.should.be.empty;
		});
	});

	describe('a request with the valid post input', function () {
		const title = 'A valid title';
		const content = 'A long-enough content';

		it('should fail with status code 401 if the user is not authenticated', async function () {
			const res = await createPost(this, null, {
				title,
				content,
				image: await this.images.getValid()
			});

			res.should.have.status(401);
			res.body.should.have.property('error', true);
		});

		it('should create the post and upload an image', async function () {
			const res = await createPost(this, user.token, {
				title,
				content,
				image: await this.images.getValid()
			});

			res.should.have.status(201);
			res.body.should.not.have.property('error');
			res.body.should.have.property('post').that.satisfies(post => {
				post.should.have.property('_id').that.is.a('string');
				post.should.have.property('title', title);
				post.should.have.property('content', content);
				post.should.have.property('image').that.is.a('string');
				post.should.have.property('creator').that.deep.equals(user.data);
				post.should.have.property('createdAt').that.is.a('string');
				post.should.have.property('updatedAt').that.is.a('string');
				post.createdAt.should.equal(post.updatedAt);
				return true;
			});
			file(res.body.post.image).should.exist;
		});
	});
});
