const { DataTypes, Model } = require('sequelize');

const sequelize = require('../database');

class Product extends Model {}

Product.init(
	{
		name: {
			allowNull: false,
			type: DataTypes.STRING
		},
		imageUrl: {
			allowNull: false,
			type: DataTypes.STRING
		},
		price: {
			allowNull: false,
			type: DataTypes.DECIMAL(10, 2).UNSIGNED
		},
		description: {
			type: DataTypes.TEXT
		}
	},
	{ sequelize }
);

module.exports = Product;
