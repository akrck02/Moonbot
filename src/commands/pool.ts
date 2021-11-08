import { SlashCommandStringOption } from "@discordjs/builders";
import { CommandInteraction, Interaction, Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    .setName("pool")
    .setDescription("Make a pool!")
    .addStringOption(new SlashCommandStringOption().setName("title").setRequired(true).setDescription("The title of the pool."))
    .addStringOption(new SlashCommandStringOption().setName("description").setRequired(true).setDescription("The description of the pool."))
    ,

	async execute(interaction : CommandInteraction) {

        const title =  interaction.options.get("title")?.value as string || "New pool";
        const description = interaction.options.get("description")?.value as string || "";

        const embed = new MessageEmbed()
        .setColor('#ff2200')
        .setTitle(title)
        .setURL('https://github.com/moonbot')
        .setDescription(description);

		await interaction.reply({ content: ' ', embeds: [embed] });
	},
}; 