const { createPool } = require('mysql2');

const config = {
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	user: process.env.MYSQL_USER,
	database: process.env.MYSQL_DBNAME,
	password: process.env.MYSQL_PASS
};

const pool = createPool(config).promise();

module.exports = pool;
