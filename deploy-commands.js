/* eslint-disable max-len */
/* eslint-disable no-tabs */

const logger = require('node-color-log');
logger.setLevel('info');
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [];

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		commands.push(command.data.toJSON());
	}
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		logger.debug('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(process.env.ClientId),
			{ body: commands },
		);

		logger.debug('Successfully reloaded application (/) commands.');
	}
	catch (error) {
		logger.error(error);
	}
})();
