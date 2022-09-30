import { ButtonInteraction, CommandInteraction, Interaction, Message } from "discord.js";
import { start } from "./api";
import * as global from "./global";
import { Player } from "./utils/player";

const fs = require("fs");
let config;

try { config = require("../config.json"); }
catch(err){
    config = {
        BOT_TOKEN: process.env.BOT_TOKEN,
        PREFIX: process.env.PREFIX,
        SERVER_ID: process.env.SERVER_ID,
        CLIENT_ID: process.env.CLIENT_ID,
    };
}

const { Client, Collection, Intents } = require("discord.js");

/**
 * Config interface
 */
export interface IConfig {
    BOT_TOKEN: string;
    PREFIX: string;
    SERVER_ID: string;
    CLIENT_ID: string;
}

/**
 * create a new discord client
 */
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
});
client.commands = new Collection();
client.buttons = new Collection();

/**
 *  Search command directory for commands
 **/
const commandFiles = fs.readdirSync("./out/commands");
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.toJSON().name, command);    
}

/**
 * search button directory for buttons
 */
const buttonFiles = fs.readdirSync("./out/buttons");
for (const file of buttonFiles) {
    const button = require(`./buttons/${file}`);
    client.buttons.set(button.data.id, button);
}

/**
 * Start Queue
 */
global.setPlayers({});

/**
 * Boot message and prepare
 */
client.on("ready", () => {
    console.log("---------------------------------------------");
    console.log("                MoonBot v.1.0                ");
    console.log("---------------------------------------------");
    console.log("Logged in as: " + client.user.tag);
    console.log("Date: " + new Date().toLocaleDateString());
    client.user.setActivity('como ella no me ama', { type: 'WATCHING' });
});

/**
 * Handle interactions on discord chat
 */
client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand()) {
        handleCommands(interaction);
    }

    if (interaction.isButton()) {
        handleButton(interaction);
    }
});

/**
 * Handle commands for the bot
 * @param interaction The interaction to handle
 * @returns void
 */
async function handleCommands(interaction: CommandInteraction) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    
    if (!command) return;

    try {
        await command.execute(interaction,client);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
        });
    }
}


/**
 * Handle buttons for the bot
 * @param interaction The interaction to handle
 * @returns void
 */
 async function handleButton(interaction: ButtonInteraction) {
    if (!interaction.isButton()) return;

    const command = client.buttons.get(interaction.customId);
    if (!command) 
        return;

    try {
        await command.execute(interaction);
    } catch (error) {
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
        });
    }
}

client.login(config.BOT_TOKEN);
start();