import { Client, Message, MessageActionRow, MessageButton } from "discord.js";
import { IConfig } from ".";

export default class Bot {
    private readonly client: Client;
    private readonly config: IConfig;
    private prefix: string;

    constructor(prefix: string, client: Client, config: IConfig) {
        this.prefix = prefix;
        this.client = client;
        this.config = config;
    }

    async handleMessage(message: Message): Promise<void> {
        if (message.author.bot) return;    
        if (!message.content.startsWith(this.prefix)) return;

        const commandBody = message.content.slice(this.prefix.length);
        const args = commandBody.split(' ') || [];
        const command = args[0].toLowerCase();


        if (command === "ping") {
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
        }        

        if (command === "hi") {
            const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('botoncico')
					.setStyle('PRIMARY'),
			);

		    await message.reply({ content: 'Hiii!', components: [row] });
        }


        
    }
}