const { Post } = require('../../models');
const ErrorHandler = require('../../utils/ErrorHandler');

const getPost = async (req, res, next) => {
	try {
		const { id } = req.params;
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
