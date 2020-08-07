const Post = require('../../models/Post');
const ErrorHandler = require('../../utils/ErrorHandler');

const updatePost = async (req, res, next) => {
	try {
		const { file } = req;
		const { title, content } = req.body;
		const { id } = req.params;
		const post = await Post.findByIdAndUpdate(
			id,
			{
				title,
				content,
				creator: {
					name: 'Anonymous Guy'
				},
				...(file && { image: file.filename })
			},
			{ new: true, runValidators: true }
		).orFail(new ErrorHandler(404, 'No document found.'));

		res.status(200).send({
			message: 'The post has been successfully updated.',
			post
		});
	} catch (err) {
		next(err);
	}
};

module.exports = updatePost;
