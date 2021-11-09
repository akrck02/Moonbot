import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

const config = require("../config.json");
const rest = new REST({ version: "9" }).setToken(config.BOT_TOKEN);

const ping = require("./commands/ping.js").data;
const pool = require("./commands/pool.js").data;
const random = require("./commands/random.js").data;
const play = require("./commands/play.js").data;
const cat = require("./commands/cat.js").data;
const queue = require("./commands/queue.js").data;
const github_repos = require("./commands/github_repos.js").data;

/**
 * add commands
 */
const commands = 
[
    ping,
    pool,
    random,
    play,
    cat,
    queue,
    github_repos
];

rest.put(Routes.applicationCommands(config.CLIENT_ID), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
