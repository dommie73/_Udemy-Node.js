const { model, Schema } = require('mongoose');

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
	description: String
});

const Product = model('Product', productSchema);

module.exports = Product;
