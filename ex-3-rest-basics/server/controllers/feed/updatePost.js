const Post = require('../../models/Post');
const ErrorHandler = require('../../utils/ErrorHandler');

const updatePost = async (req, res, next) => {
	try {
		const { file, user } = req;
		const { title, content } = req.body;
		const { id: postId } = req.params;
		const post = await Post.findOneAndUpdate(
			{ _id: postId, creator: user._id },
			{
				title,
				content,
				...(file && { image: file.filename })
			},
			{ new: true, runValidators: true }
		).orFail(new ErrorHandler(403, 'Unauthorized user.'));

		res.status(200).send({
			message: 'The post has been successfully updated.',
			post
		});
	} catch (err) {
		next(err);
	}
};

module.exports = updatePost;
