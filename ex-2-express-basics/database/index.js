const { Sequelize } = require('sequelize');

const config = {
	database: process.env.MYSQL_DBNAME,
	dialect: 'mysql',
	host: process.env.MYSQL_HOST,
	password: process.env.MYSQL_PASS,
	port: process.env.MYSQL_PORT,
	username: process.env.MYSQL_USER
};

const sequelize = new Sequelize(config);

module.exports = sequelize;
