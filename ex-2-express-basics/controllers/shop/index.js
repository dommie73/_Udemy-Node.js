const addToCart = require('./addToCart');
const deleteFromCart = require('./deleteFromCart');
const finalizePayment = require('./finalizePayment');
const getCart = require('./getCart');
const getCheckout = require('./getCheckout');
const getIndex = require('./getIndex');
const getInvoice = require('./getInvoice');
const getOrders = require('./getOrders');
const getProductDetails = require('./getProductDetails');
const getProducts = require('./getProducts');

module.exports = {
	addToCart,
	deleteFromCart,
	finalizePayment,
	getCart,
	getCheckout,
	getIndex,
	getInvoice,
	getOrders,
	getProductDetails,
	getProducts
};
