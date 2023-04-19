import { SlashCommandStringOption } from "@discordjs/builders";
import { Client, CommandInteraction, Guild, GuildMember, MessageEmbed } from "discord.js";

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    .setName("changestate")
    .setDescription("Change the state of the moonbot")
    .addStringOption(new SlashCommandStringOption().setName("message").setRequired(true).setDescription("The message to set."))
    ,

	async execute(interaction : CommandInteraction, client: Client) {

        const msg =  interaction.options.get("message")?.value as string;
        const embed = new MessageEmbed()
        .setColor('#202020')
        .setTitle("Changing my state to \"" + msg + "\" ! 💙")
        .setDescription("Much better now!");

        client.user.setActivity(msg, { type: 'WATCHING' });
		await interaction.reply({ content: ' ', embeds: [embed] });
	},
}; 
