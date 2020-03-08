const { model, Schema, Types } = require('mongoose');

const productSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	imageUrl: String,
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

const Product = model('Product', productSchema);

module.exports = Product;
