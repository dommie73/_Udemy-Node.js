const { Post } = require('../../models');

const getPosts = async (req, res, next) => {
	try {
		const currentPage = +req.query.page || 1;
		const posts = await Post.paginate({}, { currentPage });

		res.status(200).send(posts);
	} catch (err) {
		next(err);
	}
};

module.exports = getPosts;
