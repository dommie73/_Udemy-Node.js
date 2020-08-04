const { Router } = require('express');

const feedControllers = require('../controllers/feed');
const feedValidators = require('../validators/feed');
const { validationErrors } = require('../middlewares');

const router = Router();

router.get('/posts', feedControllers.getPosts);
router.post(
	'/posts',
	[feedValidators.createPost, validationErrors],
	feedControllers.createPost
);

module.exports = router;
