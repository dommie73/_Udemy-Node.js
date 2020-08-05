const { Post } = require('../../models');

const getPosts = async (req, res, next) => {
	try {
		const posts = await Post.find({});

		res.status(200).send({ posts });
	} catch (err) {
		next(err);
	}
};

module.exports = getPosts;
