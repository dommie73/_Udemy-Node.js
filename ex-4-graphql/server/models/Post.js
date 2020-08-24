const { model, Schema, Types } = require('mongoose');

const { deleteImage } = require('../utils/imageUpload');
const { paginate } = require('../utils/mongoosePlugins');

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
			type: Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{ timestamps: true }
);

postSchema.plugin(paginate, 'posts');

postSchema.pre('save', function (next) {
	if (this.isModified('title')) {
		this.title = this.title.trim();
	}
	if (this.isModified('content')) {
		this.content = this.content.trim();
	}
	next();
});

postSchema.pre(/^find/, function (next) {
	this.sort({ createdAt: 'desc' });
	next();
});

/*
	In the following middlewares `this` refers to the `query` object so calling `isModified` 
	method is not possible. As a workaround, the name of the old image is saved in `pre` hook 
	and read in `post` hooks to determine which image to remove (if any).
*/

postSchema.pre(/^findOneAnd(?:Update|Remove)$/, async function (next) {
	const oldDoc = await this.model.findOne(this.getQuery());

	this.oldImage = oldDoc && oldDoc.image;
	next();
});

postSchema.post('findOneAndUpdate', function () {
	const newImage = this.get('image');

	if (this.oldImage && newImage && this.oldImage !== newImage) {
		deleteImage(this.oldImage);
	}
});

postSchema.post('findOneAndRemove', function () {
	if (this.oldImage) {
		deleteImage(this.oldImage);
	}
});

const Post = model('Post', postSchema);

module.exports = Post;
