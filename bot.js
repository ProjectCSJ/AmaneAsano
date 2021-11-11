/* eslint-disable max-len */
/* eslint-disable no-tabs */

const logger = require('node-color-log');
logger.setLevel('info');
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');

const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		logger.info(`⏳ Loading command ${folder}/${command.data.name}...`);
		const command = require(`./commands/${folder}/${file}`);
		logger.info(`✔️ Command ${folder}/${command.data.name} has been load!`);
		client.commands.set(command.data.name, command);
	}
}

const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		logger.warn(error);
		await interaction.reply({ content: `Trigger **${interaction.commandName}** execute by ${interaction.user.tag} failed!`, ephemeral: true });
	}
});

client.login(process.env.TOKEN);
