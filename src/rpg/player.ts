import { CharacterType } from "./core/classes/character_type.js";

export class Player { 

    private name: string;
    private level: number;
    private money: number;
    private type: CharacterType;

    constructor(name: string, type: CharacterType, level: number) {
        this.name = name;
        this.level = level;
        this.money = 10;
        this.type = type;
    }  
    
}