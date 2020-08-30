const { authenticateUser, useImages, useTestServer } = require('../helpers');

const updatePost = (
	mochaContext,
	token,
	{ id, title, content, image } = {}
) => {
	const request = chai
		.request(mochaContext.server)
		.put(`/feed/posts/${id}`)
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

describe('PUT /feed/posts/:id', function () {
	useTestServer();
	useImages();

	let authorizedUser;
	let unauthorizedUser;
	let originalPost;

	beforeEach(async function () {
		authorizedUser = await authenticateUser(this, {
			email: 'test1@test.com',
			password: 'test1',
			name: 'Authorized'
		});
		unauthorizedUser = await authenticateUser(this, {
			email: 'test2@test.com',
			password: 'test2',
			name: 'Unauthorized'
		});
	});

	beforeEach(async function () {
		const { buffer, name } = await this.images.getValid();
		const { body } = await chai
			.request(this.server)
			.post('/feed/posts')
			.set('Authorization', `Bearer ${authorizedUser.token}`)
			.field('title', 'A valid title')
			.field('content', 'A long-enough content')
			.attach('image', buffer, name);

		originalPost = body.post;
	});

	describe('a request with the invalid post input', function () {
		it('should fail with status code 401 if the user is not authenticated', async function () {
			const res = await updatePost(this, null, { id: originalPost._id });

			res.should.have.status(401);
			res.body.should.have.property('error', true);
		});

		it('should fail with status code 422 if the title and content are missing', async function () {
			const res = await updatePost(this, authorizedUser.token, {
				id: originalPost._id
			});

			res.should.have.status(422);
			res.body.should.have.property('error', true);
			res.body.should.have
				.property('validationErrors')
				.that.has.all.keys('title', 'content');
			file(originalPost.image).should.exist;
		});

		it('should fail with status code 422 if the title and content are too short', async function () {
			const res = await updatePost(this, authorizedUser.token, {
				id: originalPost._id,
				title: 'test',
				content: 'test'
			});

			res.should.have.status(422);
			res.body.should.have.property('error', true);
			res.body.should.have
				.property('validationErrors')
				.that.has.all.keys('title', 'content');
			file(originalPost.image).should.exist;
		});

		it('should fail with status code 422 if the provided file is not an image', async function () {
			const res = await updatePost(this, authorizedUser.token, {
				_id: originalPost._id,
				title: 'valid',
				content: 'valid',
				image: await this.images.getNonImage()
			});

			res.should.have.status(422);
			res.body.should.have.property('message', 'Invalid file type.');
			file(originalPost.image).should.exist;
		});

		it('should fail with status code 422 if the provided image is too large', async function () {
			const res = await updatePost(this, authorizedUser.token, {
				_id: originalPost._id,
				title: 'valid',
				content: 'valid',
				image: await this.images.getTooLarge()
			});

			res.should.have.status(422);
			res.body.should.have.property('message', 'File too large');
			file(originalPost.image).should.exist;
		});
	});

	describe('a request with the valid post input', function () {
		const title = 'Another title';
		const content = 'More awesome content';

		it('should fail with status code 401 if the user is not authenticated', async function () {
			const res = await updatePost(this, null, {
				id: originalPost._id,
				title,
				content
			});

			res.should.have.status(401);
			res.body.should.have.property('error', true);
		});

		it('should fail with status code 403 if the user is not authorized', async function () {
			const res = await updatePost(this, unauthorizedUser.token, {
				id: originalPost._id,
				title,
				content
			});

			res.should.have.status(403);
			res.body.should.have.property('error', true);
		});

		it('should fail with status code 404 if the post does not exist', async function () {
			const res = await updatePost(this, authorizedUser.token, {
				id: 1,
				title,
				content
			});

			res.should.have.status(404);
			res.body.should.have.property('error', true);
		});

		it('should update the post and replace the old image with the new one', async function () {
			const res = await updatePost(this, authorizedUser.token, {
				id: originalPost._id,
				title,
				content,
				image: await this.images.getValid()
			});

			res.should.have.status(200);
			res.body.should.not.have.property('error');
			res.body.should.have.property('post').that.satisfies(post => {
				post.should.have.property('_id', originalPost._id);
				post.should.have.property('title', title);
				post.should.have.property('content', content);
				post.should.have
					.property('image')
					.that.does.not.equal(originalPost.image);
				post.should.have
					.property('creator')
					.that.deep.equals(authorizedUser.data);
				post.should.have.property('createdAt').that.is.a('string');
				post.should.have.property('updatedAt').that.is.a('string');
				post.createdAt.should.not.equal(post.updatedAt);
				new Date(post.updatedAt).valueOf().should.be.closeTo(Date.now(), 1000);
				return true;
			});
			file(originalPost.image).should.not.exist;
			file(res.body.post.image).should.exist;
		});

		it('should update the post and keep the old image if the new one is not provided', async function () {
			const res = await updatePost(this, authorizedUser.token, {
				id: originalPost._id,
				title,
				content
			});

			res.should.have.status(200);
			res.body.should.not.have.property('error');
			res.body.should.have.property('post').that.satisfies(post => {
				post.should.have.property('_id', originalPost._id);
				post.should.have.property('title', title);
				post.should.have.property('content', content);
				post.should.have.property('image', originalPost.image);
				post.should.have
					.property('creator')
					.that.deep.equals(authorizedUser.data);
				post.should.have.property('createdAt').that.is.a('string');
				post.should.have.property('updatedAt').that.is.a('string');
				post.createdAt.should.not.equal(post.updatedAt);
				new Date(post.updatedAt).valueOf().should.be.closeTo(Date.now(), 1000);
				return true;
			});
			file(originalPost.image).should.exist;
		});
	});
});
