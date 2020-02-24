const { DataTypes, Model } = require('sequelize');

const sequelize = require('../database');

class User extends Model {}

User.init(
	{
		name: {
			allowNull: false,
			type: DataTypes.STRING
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING
		}
	},
	{ sequelize }
);

module.exports = User;
