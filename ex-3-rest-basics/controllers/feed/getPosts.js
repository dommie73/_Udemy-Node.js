const getPosts = (req, res) => {
	res.status(200).send({ posts: [] });
};

module.exports = getPosts;
