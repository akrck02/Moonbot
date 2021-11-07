import { Message } from "discord.js";
import Bot from "./bot";

const config = require("./config.json");
const { Client, Intents } = require('discord.js');

/**
 * create a new discord client
 */ 
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.login(config.BOT_TOKEN);

/**
 * runtime variables
 */
const prefix = "$";
let bot : Bot;

/**
 * On startup, create a new bot instance
 */
client.on("ready", function(message : Message) {
    console.log("I'm ready!");
    bot = new Bot(prefix, client, config);
});

/**
 * On message, check if the message is a command
 */
client.on("message", function(message : Message) {
    bot.handleMessage(message);
});                                      
