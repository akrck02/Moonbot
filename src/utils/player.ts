import { VoiceConnection } from "@discordjs/voice";
import { Guild, GuildMember } from "discord.js";
import { Queue } from "./queue.js";
import { play } from "./youtube.js";

export class Player {
    private youtube: Queue;
    private connection : VoiceConnection | undefined;

    constructor() {
        this.youtube = new Queue();
        this.connection = undefined;
    }

    /**
     * Connect player to voice channel
     * @param member member to follow
     * @param guild server to connect
     */
    connectVoiceChannel(member : GuildMember, guild : Guild) {
        const {joinVoiceChannel} = require('@discordjs/voice'); 
    
        this.connection = joinVoiceChannel({
            channelId: member.voice.channel?.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
        });

    }

    /**
     * Add url to youtube Queue
     * @param url The url to add
     */
    addToYoutube(url : string) {        
        this.youtube.add(url);
    }

    /**
     * Disconnect from voice channel
     */
    leaveVoiceChannel() {
        this.connection?.destroy();
    }    

    /**
     * Play youtube video
     */
    playYoutube() {
       play(this);
    }


    /**
     * Get youtube queue
     * @returns the youtube queue
     */
    getYoutube() {
        return this.youtube;
    }

    /**
     * Get the voice connection
     * @returns the voice connection
     */
    getConnection() {
        return this.connection;
    }
}