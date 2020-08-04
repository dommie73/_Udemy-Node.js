const getPosts = (req, res, next) => {
	try {
		res.status(200).send({ posts: [
			{
				_id: 1,
				title: 'A dummy post',
				content: 'What do you expect from the dummy post?',
				image: '',
				creator: {
					name: 'John Doe'
				},
				createdAt: new Date()
			}
		] });
	} catch (err) {
		next(err);
	}
};

module.exports = getPosts;
