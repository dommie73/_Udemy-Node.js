const { isValidObjectId } = require('mongoose');

const { Post } = require('../../models');
const ErrorHandler = require('../../utils/ErrorHandler');

const getPost = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (!isValidObjectId(id)) {
			throw new ErrorHandler(404, 'Post not found.');
		}

		const post = await Post.findById(id);

		if (!post) {
			throw new ErrorHandler(404, `Cannot find post ${id}.`);
		}

		res.status(200).send({ post });
	} catch (err) {
		next(err);
	}
};

module.exports = getPost;
