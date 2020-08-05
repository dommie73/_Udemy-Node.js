const { model, Schema } = require('mongoose');

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		image: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		creator: {
			type: Object,
			required: true
		}
	},
	{ timestamps: true }
);

const Post = model('Post', postSchema);

module.exports = Post;
