import { CommandInteraction, Interaction, Message } from "discord.js";

module.exports = {
    data: {
        id: "retryPing",
    },
    async execute(interaction: Message) {
        const ping = require("../commands/ping.js");

        let array = interaction.content;
        console.log(array);
        
        ping.execute(interaction);
    },
};
