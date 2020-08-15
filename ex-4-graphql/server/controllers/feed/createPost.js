const Post = require('../../models/Post');
const io = require('../../websocket');

const createPost = async (req, res, next) => {
	try {
		const { file, user } = req;
		const { title, content } = req.body;
		const post = await Post.create({
			title,
			content,
			image: file.filename,
			creator: user
		});

		io.instance.emit('posts', {
			action: 'create',
			post
		});

		res.status(201).send({
			message: 'The post has been successfully created.',
			post
		});
	} catch (err) {
		next(err);
	}
};

module.exports = createPost;
