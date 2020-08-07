const { Router } = require('express');

const feedControllers = require('../controllers/feed');
const feedValidators = require('../validators/feed');
const { imageUpload, validationErrors } = require('../middlewares');

const router = Router();

router.get('/posts', feedControllers.getPosts);
router.get('/posts/:id', feedControllers.getPost);
router.put(
	'/posts/:id',
	[imageUpload('image'), feedValidators.post, validationErrors],
	feedControllers.updatePost
);
router.post(
	'/posts',
	[
		imageUpload('image'),
		feedValidators.post,
		feedValidators.image,
		validationErrors
	],
	feedControllers.createPost
);

module.exports = router;
