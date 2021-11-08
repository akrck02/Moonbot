import { Interaction, Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),

	async execute(interaction : Message) {
        
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('primary')
                .setLabel('Retry')
                .setCustomId('retryPing')
                .setStyle('PRIMARY')
                .setEmoji('🔁')
                ,
        );

        const ms = Date.now() - interaction.createdTimestamp;

        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Pong! 👌')
        .setURL('https://discord.js.org')
        .setDescription('Response in ' + ms + 'ms');

		await interaction.reply({ content: ' ', embeds: [embed], components: [row] });
	},
}; 