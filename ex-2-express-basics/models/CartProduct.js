const { DataTypes, Model } = require('sequelize');

const sequelize = require('../database');

class CartProduct extends Model {}

CartProduct.init(
	{
		quantity: {
			allowNull: false,
			defaultValue: 1,
			type: DataTypes.INTEGER.UNSIGNED
		}
	},
	{ sequelize }
);

module.exports = CartProduct;
