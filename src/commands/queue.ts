import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
import { players } from "../global.js";
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Get player queue.")
    ,

	async execute(interaction : CommandInteraction) {

        const guidmember = interaction.member as GuildMember; 
        const channel = guidmember.voice.channel;

        let embed : MessageEmbed | undefined = undefined;
        if(channel){
            const player = players[channel.id];

            if(player){
                const queue = player.getYoutube().getList();

                embed = new MessageEmbed()
                .setColor('#f02020')
                .setTitle("▶️   Player queue   🎵")
                .setURL('https://github.com/moonbot')
                .setDescription("Current queue");
        
                let i = 0;
                queue.forEach(url => {
                    embed?.addField(i + ")", url, false);
                    i++;
                });

            } else {
                embed = new MessageEmbed()
                .setColor('#f02020')
                .setTitle("✖️   There is no player connected!  ❌")
                .setURL('https://github.com/moonbot')
                .setDescription("Moonbot has no players connected to your voice channel");
            }

        }else {
            embed = new MessageEmbed()
            .setColor('#f02020')
            .setTitle("✖️   You must be connected to a voice channel!  ❌")
            .setURL('https://github.com/moonbot')
            .setDescription("Connect to a channel to view the queue");
        }
      
		await interaction.reply({ content: ' ', embeds: [embed] }); 
	},
}; 