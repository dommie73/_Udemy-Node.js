const Post = require('../../models/Post');

const deletePost = async (req, res, next) => {
	try {
		const { id } = req.params;
		await Post.findByIdAndRemove(id);

		res.status(200).send({
			message: 'The post has been successfully deleted.'
		});
	} catch (err) {
		next(err);
	}
};

module.exports = deletePost;
