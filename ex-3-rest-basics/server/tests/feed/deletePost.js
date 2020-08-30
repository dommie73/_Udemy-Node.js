const { authenticateUser, useImages, useTestServer } = require('../helpers');

const deletePost = (mochaContext, token, id) => {
	return chai
		.request(mochaContext.server)
		.delete(`/feed/posts/${id}`)
		.set('Authorization', `Bearer ${token}`);
};

describe('DELETE /feed/posts/:id', function () {
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

	it('should fail with status code 401 if the user is not authenticated', async function () {
		const res = await deletePost(this, null, originalPost._id);

		res.should.have.status(401);
		res.body.should.have.property('error', true);
	});

	it('should fail with status code 403 if the user is not authorized', async function () {
		const res = await deletePost(
			this,
			unauthorizedUser.token,
			originalPost._id
		);

		res.should.have.status(403);
		res.body.should.have.property('error', true);
	});

	it('should fail with status code 404 if the post does not exist', async function () {
		const res = await deletePost(this, authorizedUser.token, 1);

		res.should.have.status(404);
		res.body.should.have.property('error', true);
	});

	it('should delete the existing post and the associated image', async function () {
		const res = await deletePost(this, authorizedUser.token, originalPost._id);

		res.should.have.status(200);
		res.body.should.not.have.property('error');
		file(originalPost.image).should.not.exist;
	});
});
