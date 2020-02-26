const { DataTypes, Model } = require('sequelize');

const sequelize = require('../database');

class OrderProduct extends Model {}

OrderProduct.init(
	{
		quantity: {
			allowNull: false,
			defaultValue: 1,
			type: DataTypes.INTEGER.UNSIGNED
		}
	},
	{ sequelize }
);

module.exports = OrderProduct;
