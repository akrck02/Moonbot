import { SlashCommandNumberOption, SlashCommandStringOption } from "@discordjs/builders";
import { CommandInteraction, Interaction, Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Get random number between limits.")
    .addNumberOption(new SlashCommandNumberOption().setName("min").setRequired(false).setDescription("The minimum."))
    .addNumberOption(new SlashCommandNumberOption().setName("max").setRequired(false).setDescription("The maximum."))
    .addNumberOption(new SlashCommandNumberOption().setName("digits").setRequired(false).setDescription("Number of digits."))
    ,

	async execute(interaction : CommandInteraction) {

        const minStr = interaction.options.get("min") || {value : 0};
        const maxStr = interaction.options.get("max") || {value : 10};
        const digitsStr = interaction.options.get("digits") || {value : 2};

        const min = minStr.value as number;
        const max = maxStr.value as number;
        const digits = digitsStr.value as number;

        const rand = (Math.random() * (max - min) + min).toFixed(digits);


        const embed = new MessageEmbed()
        .setColor('#202020')
        .setTitle("Your random number: ")
        .setURL('https://github.com/moonbot')
        .setDescription(rand + "");

		await interaction.reply({ content: ' ', embeds: [embed] });
	},
}; 