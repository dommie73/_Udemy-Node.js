const createPost = (req, res, next) => {
	try {
		const { title, content } = req.body;

		res.status(201).send({
			message: 'The post has been successfully created.',
			post: {
				_id: new Date().getTime(),
				title,
				content,
				image: '',
				creator: {
					name: 'Anonymous Guy'
				},
				createdAt: new Date()
			}
		});
	} catch (err) {
		next(err);
	}
};

module.exports = createPost;
