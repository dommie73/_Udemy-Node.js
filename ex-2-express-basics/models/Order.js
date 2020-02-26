const { Model } = require('sequelize');

const sequelize = require('../database');
const OrderProduct = require('./OrderProduct');
const Product = require('./Product');

class Order extends Model {}

Order.init({}, { sequelize });

Order.belongsToMany(Product, {
	foreignKey: 'orderId',
	through: OrderProduct
});

Product.belongsToMany(Order, {
	foreignKey: 'productId',
	through: OrderProduct
});

module.exports = Order;
