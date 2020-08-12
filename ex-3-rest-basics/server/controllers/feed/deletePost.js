const Post = require('../../models/Post');
const ErrorHandler = require('../../utils/ErrorHandler');

const deletePost = async (req, res, next) => {
	try {
		const { user } = req;
		const { id: postId } = req.params;
		await Post.findOneAndRemove({ _id: postId, creator: user._id }).orFail(
			new ErrorHandler(403, 'Unauthorized user.')
		);

		res.status(200).send({
			message: 'The post has been successfully deleted.'
		});
	} catch (err) {
		next(err);
	}
};

module.exports = deletePost;
