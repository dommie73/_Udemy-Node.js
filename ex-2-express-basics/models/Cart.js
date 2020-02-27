const { Model } = require('sequelize');

const sequelize = require('../database');
const CartProduct = require('./CartProduct');
const Product = require('./Product');

class Cart extends Model {}

Cart.init({}, { sequelize });

Cart.belongsToMany(Product, {
	foreignKey: 'cartId',
	through: CartProduct
});

Product.belongsToMany(Cart, {
	foreignKey: 'productId',
	through: CartProduct
});

module.exports = Cart;
