import { Interaction, Message } from "discord.js";
import Bot from "./bot";

const fs = require('fs');
const config = require("./config.json");
const { Client, Collection, Intents } = require('discord.js');


/**
 * Config interface
 */
export interface IConfig {
    BOT_TOKEN: string;  
    PREFIX: string;
}

/**
 * create a new discord client
 */ 
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./out/commands');
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    client.commands.set(command.data.toJSON().name,command);
}

console.log(client.commands);

client.on('ready', () => {
    console.log('ready');
});

client.on('interactionCreate', async (interaction:Interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

    console.log("Interaction detected.");
    console.log("command : " + interaction.commandName);
    console.log("internal command : " + command);
    
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(config.BOT_TOKEN);

