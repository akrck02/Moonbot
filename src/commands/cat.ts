import {
    Message,
    MessageEmbed
} from "discord.js";
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cat")
        .setDescription("Replies with a cat!"),

    async execute(interaction: Message) {
        const embed = new MessageEmbed()
            .setColor("#ff00ff")
            .setTitle("Cat for you! 🐈")
            .setURL("https://github.com/akrck02/moonbot")
        ;

        await interaction.reply({
            content: " ",
            files: ["https://cataas.com/cat/says/hello%20world!"],
            embeds: [embed],
        });
    },
};

