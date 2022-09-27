import { SlashCommandStringOption } from "@discordjs/builders";
import { CommandInteraction, Guild, GuildMember, MessageEmbed } from "discord.js";
import { players } from "../global.js";
import { Player } from "../utils/player.js";
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a video on voice chat")
    .addStringOption(new SlashCommandStringOption().setName("url").setRequired(true).setDescription("The URL of the video."))
    ,

	async execute(interaction : CommandInteraction) {

        const url =  interaction.options.get("url")?.value as string || "https://www.youtube.com/watch?v=U06jlgpMtQs";
        const embed = new MessageEmbed()
        .setColor('#202020')
        .setTitle("▶️ Video added to queue 🎵")
        .setURL(url)
        .setDescription(url);

		await interaction.reply({ content: ' ', embeds: [embed] });
        await play(interaction, url);
	},
}; 

async function play(interaction : CommandInteraction , url : string) {
    const guidmember = interaction.member as GuildMember; 
    const guild = interaction.guild as Guild;
    const channel = guidmember.voice.channel;

    if(channel) {
        
        // if player active get it, else create a new one
        let player = players[channel.id];
        if(!player){
            player = new Player();
            player.connectVoiceChannel(guidmember,guild);
            player.addToYoutube(url);
            player.playYoutube();
            players[channel.id] = player;
            return;
        }

        // connect to voice channel
        player.connectVoiceChannel(guidmember,guild);
        
        // add url to queue
        player.addToYoutube(url);
        
        // update player 
        players[channel.id] = player;
    }

}