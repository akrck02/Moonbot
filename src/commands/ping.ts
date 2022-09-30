import { Client, Interaction, Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),

	async execute(interaction : Message, client: Client, retry : boolean = false) {

        if(retry) {
            const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('You did it!! 👌')
            .setURL('https://github.com/akrck02/moonbot')
            .setDescription('May the 4th be with u 🙂');
    
            await interaction.reply({ content: ' ', embeds: [embed]});
            return;
        } 

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('primary')
                .setLabel('Retry')
                .setCustomId('retryPing')
                .setStyle('PRIMARY')
                .setEmoji('🪄')
                ,
        );

        const ms = Date.now() - interaction.createdTimestamp;
        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Pong! 👌')
        .setURL('https://github.com/akrck02/moonbot')
        .setImage(interaction.member?.user.avatarURL() || "")
        .setDescription('Hi, ' + interaction.member?.user.username + '! \n Response in ' + ms + 'ms');

        await interaction.reply({ content: ' ', embeds: [embed], components: [row] });
	},
}; 