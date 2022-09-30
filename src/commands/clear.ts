import { SlashCommandStringOption } from "@discordjs/builders";
import { CommandInteraction, Guild, GuildMember, MessageEmbed } from "discord.js";
import { players } from "../global.js";
import { Player } from "../utils/player.js";
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear messages form chat (privileged)")
    .addStringOption(new SlashCommandStringOption().setName("number").setRequired(true).setDescription("The number of messages to remove or all."))
    ,

	async execute(interaction : CommandInteraction) {

        const url =  interaction.options.get("number")?.value as number || "all";
        const embed = new MessageEmbed()
        .setColor('#202020')
        .setTitle("Not implemented yet 💻")
        .setDescription("Sorry you'll have to wait a little longer 🧪");

		await interaction.reply({ content: ' ', embeds: [embed] });
        //Oawait play(interaction, url);
    
	},
}; 