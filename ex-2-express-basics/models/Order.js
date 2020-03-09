const { model, Schema, Types } = require('mongoose');

const Product = require('./Product');

const orderedProduct = new Schema();

orderedProduct
	.add(Product.schema)
	.add({ quantity: { type: Number, required: true } });

const orderSchema = new Schema({
	products: [
		{
			type: orderedProduct,
			required: true
		}
	],
	totalPrice: {
		type: Number,
		required: true
	},
	userId: {
		type: Types.ObjectId,
		ref: 'User',
		required: true
	}
});

const Order = model('Order', orderSchema);

module.exports = Order;
