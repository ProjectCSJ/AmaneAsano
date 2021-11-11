/* eslint-disable max-len */
/* eslint-disable no-tabs */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const logger = require('node-color-log');
logger.setLevel('info');
module.exports = {
	defaultPermission: true,
	data: new SlashCommandBuilder()
		.setName('shutdown')
		.setDescription('Shutdown the bot'),
	async execute(interaction) {
		const shutdown = new MessageEmbed()
			.setColor('RED')
			.setAuthor('G Cat Beta Version', 'https://cdn.discordapp.com/avatars/882519953100656680/dd87a83415c4f4b77ade768d34e694f4.png', 'https://csj.yeyunstudio.com')
			.setTitle('🛑 緊急停止装置動作')
			.setDescription(`<@${interaction.client.user.id}>已被<@826327097945489408>關閉`)
			.setFooter('Copyright © Project CSJ', 'https://cdn.discordapp.com/avatars/882519953100656680/dd87a83415c4f4b77ade768d34e694f4.png');
		await interaction.reply({ embeds: [shutdown], ephemeral: true });
		logger.info(`🛑 ${interaction.client.user.tag} 已由作者關閉`);
		process.exit();
	},
};
