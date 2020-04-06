const { model, Schema, Types } = require('mongoose');

const { removeUploadFromStatic } = require('../utils/files');

const productSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	image: String,
	price: {
		type: Number,
		required: true
	},
	description: String,
	userId: {
		type: Types.ObjectId,
		ref: 'User',
		required: true
	}
});

/*
	In the following middlewares `this` refers to the `query` object so calling `isModified` 
	method is not possible. As a workaround, the name of the old image is saved in `pre` hook 
	and read in `post` hooks to determine which image to remove (if any).
*/

productSchema.pre(/^findOneAnd(?:Update|Remove)$/, async function(next) {
	const oldDoc = await this.model.findOne(this.getQuery());

	this.oldImage = oldDoc && oldDoc.image;
	next();
});

productSchema.post('findOneAndUpdate', async function() {
	const newImage = this.get('image');

	if (this.oldImage && newImage && this.oldImage !== newImage) {
		await removeUploadFromStatic(this.oldImage);
	}
});

productSchema.post('findOneAndRemove', async function() {
	if (this.oldImage) {
		await removeUploadFromStatic(this.oldImage);
	}
});

const Product = model('Product', productSchema);

module.exports = Product;
