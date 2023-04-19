import { SlashCommandStringOption } from "@discordjs/builders";
import {
    CommandInteraction, MessageEmbed
} from "discord.js";
import { getUserRepositories } from "../utils/github/api/github";
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("github-repos")
        .setDescription("All the public github repos of a user")
        .addStringOption(new SlashCommandStringOption().setName("user").setRequired(true).setDescription("The github user"))
        ,

    async execute(interaction: CommandInteraction) {

        await interaction.deferReply();
        const user = interaction.options.getString("user");   
        if(!user) return interaction.reply("Please provide a user");

        const response = await getUserRepositories(user);
        const repos = response.data;
    
        const embed = new MessageEmbed()
        .setColor("#ff00ff")
        .setTitle("Repositories of " + user + " on Github 💻")
        .setURL("https://github.com/" + user + "?tab=repositories");

        for (const key in repos) {
            const repo = repos[key];
            embed.setImage(repo.owner.avatar_url || "");
            embed.addFields({name:repo.name, value: repo.description || "no description"})
        }

        await interaction.editReply({content: repos.length +" repositories found! 🤓" , embeds : [embed]});        
    },
};

