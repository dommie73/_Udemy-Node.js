const { model, Schema, Types } = require('mongoose');

const _defaultId = '5e5edf4325e1d120d896d4c8';

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	cart: {
		products: [
			{
				_id: {
					type: Types.ObjectId,
					ref: 'Product',
					required: true
				},
				quantity: {
					type: Number,
					required: true
				}
			}
		]
	}
});

userSchema.static('createDefault', function() {
	return this.create({
		_id: _defaultId,
		name: 'Dummy',
		email: 'dummy@us.er'
	});
});

userSchema.static('findDefault', function() {
	return this.findById(_defaultId);
});

userSchema.method('addToCart', function(productId) {
	const { products } = this.cart;
	const productIndex = this.findProductIndex(productId);

	if (~productIndex) {
		const { quantity } = products[productIndex];
		products[productIndex].quantity = quantity + 1;
	} else {
		products.push({
			_id: productId,
			quantity: 1
		});
	}

	return this.save();
});

userSchema.method('deleteFromCart', function(productId) {
	this.cart.products = this.cart.products.filter(
		cartProduct => cartProduct._id.toString() !== productId
	);

	return this.save();
});

userSchema.method('deleteNonExistentProducts', function() {
	return this.populate('cart.products._id')
		.execPopulate()
		.then(() => {
			this.cart.products = this.cart.products.filter(
				cartProduct => cartProduct._id !== null
			);

			return this.save();
		});
});

userSchema.method('findProductIndex', function(productId) {
	return this.cart.products.findIndex(
		cartProduct => cartProduct._id.toString() === productId
	);
});

userSchema.method('getCart', function() {
	return this.deleteNonExistentProducts()
		.then(user =>
			user.cart.products
				.toObject()
				.filter(({ _id }) => _id !== null)
				.map(product => ({ ...product._id, quantity: product.quantity }))
		)
		.then(products => ({
			products,
			totalPrice: products
				.reduce((sum, product) => sum + product.price * product.quantity, 0)
				.toFixed(2)
		}));
});

userSchema.method('getOrders', function() {
	return this.populate('orders')
		.execPopulate()
		.then(user => user.orders);
});

userSchema.virtual('orders', {
	ref: 'Order',
	localField: '_id',
	foreignField: 'userId'
});

const User = model('User', userSchema);

module.exports = User;
