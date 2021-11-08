import { Interaction } from "discord.js";

module.exports = {
    data: {
        id: "retryPing",
    },
    async execute(interaction: Interaction) {
        const ping = require("../commands/ping.js");
        ping.execute(interaction);
    },
};
