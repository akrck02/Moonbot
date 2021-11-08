import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

const config = require("./config.json");
const rest = new REST({ version: '9' }).setToken(config.BOT_TOKEN);
const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
].map(command => command.toJSON());

rest.put(Routes.applicationCommands(config.CLIENT_ID), { body: commands })
.then(() => console.log('Successfully registered application commands.'))
.catch(console.error);