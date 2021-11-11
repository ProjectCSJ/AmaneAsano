/* eslint-disable max-len */
/* eslint-disable no-tabs */

const logger = require('node-color-log');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		const dotenv = require('dotenv');
		dotenv.config();

		const DB_HOST = process.env.DB_HOST;
		const DB_USR = process.env.DB_USR;
		const DB_PWD = process.env.DB_PWD;

		const mysql = require('mysql');

		const DB = mysql.createConnection({
			host: DB_HOST,
			user: DB_USR,
			password: DB_PWD,
		});

		logger.info(`正在連線到${DB_HOST}...`);

		DB.connect((err) => {
			if (err) {throw err;}
			logger.info(`Connected to ${DB_HOST}!`);
			logger.info(`Closing connection from ${DB_HOST}...`);
			DB.end();
			logger.info(`Disconnected from ${DB_HOST} complete!`);

			logger.info(`Trying to login with username '${client.user.tag}'...`);
			logger.info('logged in complete');
			logger.info(`Username: ${client.user.tag}!`);
		});
	},
};
