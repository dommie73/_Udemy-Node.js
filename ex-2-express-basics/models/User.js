const { model, Schema, Types } = require('mongoose');
const { compare, hash } = require('bcryptjs');

const { addHoursToNow, generateToken } = require('../utils/helpers');
const Order = require('./Order');

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	passwordResetToken: {
		value: String,
		expires: Date
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

userSchema.pre('save', async function(next) {
	if (this.isModified('password')) {
		this.password = await hash(this.password, 12);
	}
	next();
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

userSchema.method('createOrder', function() {
	return this.getCart()
		.then(cart => Order.create({ ...cart, userId: this._id }))
		.then(() => this.emptyCart());
});

userSchema.method('createPasswordResetToken', async function() {
	const token = await generateToken(32);

	this.passwordResetToken = {
		value: token,
		expires: addHoursToNow(2)
	};

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

userSchema.method('emptyCart', function() {
	this.cart.products = [];

	return this.save();
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
			totalPrice: products.reduce(
				(sum, product) => sum + product.price * product.quantity,
				0
			)
		}));
});

userSchema.method('getOrders', function() {
	return this.populate('orders')
		.execPopulate()
		.then(user => user.orders);
});

userSchema.method('isMatchingPassword', async function(password) {
	return await compare(password, this.password);
});

userSchema.method('updatePassword', function(password) {
	this.password = password;
	this.passwordResetToken = undefined;

	return this.save();
});

userSchema.virtual('orders', {
	ref: 'Order',
	localField: '_id',
	foreignField: 'userId'
});

const User = model('User', userSchema);

module.exports = User;
