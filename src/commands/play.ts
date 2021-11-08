import { SlashCommandStringOption } from "@discordjs/builders";
import { CommandInteraction, Guild, GuildMember, MessageEmbed } from "discord.js";
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
        .setTitle("Playing video")
        .setURL(url)
        .setDescription(url);

		await interaction.reply({ content: ' ', embeds: [embed] });

        play(interaction, url);
	},
}; 



function play(interaction : CommandInteraction , url : string) {
    const ytdl = require('ytdl-core');
    const {
        AudioPlayerStatus,
        StreamType,
        createAudioPlayer,
        createAudioResource,
        joinVoiceChannel,
    } = require('@discordjs/voice'); 


    const member = interaction.member as GuildMember;
    const guild =  interaction.guild as Guild; 

    const connection = joinVoiceChannel({
        channelId: member.voice.channel?.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
    });

    const stream = ytdl(url, { filter: 'audioonly' });
    const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
    const player = createAudioPlayer();
    
    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => connection.destroy()); 
}