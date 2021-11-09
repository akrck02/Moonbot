const Canvas = require('canvas');
import {
    Message,
    MessageAttachment,
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

        const canvas = Canvas.createCanvas(700, 700);
		const context = canvas.getContext('2d');

        const background = await Canvas.loadImage('https://cataas.com/cat/says/%EF%B8%8F');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');

        await interaction.reply({
            content: " ",
            files: [attachment],
            embeds: [embed],
        });
    },
};

