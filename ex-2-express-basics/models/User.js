const { DataTypes, Model } = require('sequelize');

const sequelize = require('../database');
const Cart = require('./Cart');
const Product = require('./Product');

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

User.hasMany(Product, {
	foreignKey: 'userId',
	onDelete: 'CASCADE'
});

Product.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Cart, {
	foreignKey: {
		name: 'userId',
		unique: true
	}
});

module.exports = User;
