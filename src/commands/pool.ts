import { SlashCommandStringOption } from "@discordjs/builders";
import { CommandInteraction, Interaction, Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    .setName("pool")
    .setDescription("Make a pool!")
    .addStringOption(new SlashCommandStringOption().setName("title").setRequired(true).setDescription("The title of the pool."))
    .addStringOption(new SlashCommandStringOption().setName("description").setRequired(true).setDescription("The description of the pool."))
    .addStringOption(new SlashCommandStringOption().setName("options").setRequired(true).setDescription("The options separates by & "))
    ,

	async execute(interaction : CommandInteraction) {
        const title =  interaction.options.get("title")?.value as string || "";
        const description = interaction.options.get("description")?.value as string || "";
        const optionsStr = interaction.options.get("options")?.value as string || "";
        const options = optionsStr.split("&");

        const embed = new MessageEmbed()
        .setColor('#ff2200')
        .setTitle(title)
        .setURL('https://github.com/moonbot')
        .setDescription(description);

        const emojis = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"];
        const def = "🔵";

        for (let i = 0; i < options.length; i++) {
            const option = options[i].trim();
            embed.addField(emojis[i] || def , option, true);  
            embed.setAuthor(interaction.member.user.username); 
        }

        await interaction.reply({content: "yay!"});
		await interaction.channel?.send({embeds: [embed]}).then(async (msg : Message) => {
            for (let i = 0; i < options.length; i++) {
                const emoji = emojis[i] || def;
                await msg.react(emoji);
            }
        });
	},
}; 