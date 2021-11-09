import { Player } from "./utils/player.js";

/**
 * Start Queue
 */
 export let players : { [key: string]: Player } = {};

 export function setPlayers(data: any) {
     players = data;
 }