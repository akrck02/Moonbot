import { Player } from "./player.js";

export function play(player : Player) {
    let video = player.getYoutube().getCurrent()
    
    if (video) {
        playVideo(player,video);
    }
}

async function playVideo(player : Player, url : string) {
    
    const ytdl = require('ytdl-core');
    const {
        AudioPlayerStatus,
        StreamType,
        createAudioPlayer,
        createAudioResource,
    } = require('@discordjs/voice'); 

    const stream = ytdl(url, { filter: 'audioonly' });
    const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
    const audio = createAudioPlayer();
    
    audio.play(resource);
    player.getConnection()?.subscribe(audio);

    audio.on(AudioPlayerStatus.Idle, () => {
        player.getYoutube().skip(1);

        if(player.getYoutube().getCurrent()) 
            play(player);
        else 
            player.leaveVoiceChannel()
    }); 
}