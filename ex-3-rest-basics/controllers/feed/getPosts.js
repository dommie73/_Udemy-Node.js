const getPosts = (req, res, next) => {
	try {
		res.status(200).send({ posts: [] });
	} catch (err) {
		next(err);
	}
};

module.exports = getPosts;
