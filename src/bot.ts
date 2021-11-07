import { Client, Message } from "discord.js";

export default class Bot {
    private readonly client: Client;
    private readonly config: Object;
    private prefix: string;

    constructor(prefix: string, client: Client, config: Object) {
        this.prefix = prefix;
        this.client = client;
        this.config = config;
    }

    handleMessage(message: Message): void {
        if (message.author.bot) return;    
        if (!message.content.startsWith(this.prefix)) return;

        const commandBody = message.content.slice(this.prefix.length);
        const args = commandBody.split(' ') || [];
        const command = args[0].toLowerCase();

        if (command === "ping") {
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
        }        
    }
}