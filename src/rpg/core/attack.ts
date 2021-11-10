
export enum ATTACK_TYPE{
    MAGIC,
    PHYSIC
}

export default class Attack {
    private power : number;
    private type : ATTACK_TYPE;
    private name : string;
    private description : string;
    private criticPercentage : number;
    private emoji: string;

    constructor(power:number, type:ATTACK_TYPE, name:string, description:string, criticPercentage:number, emoji:string){
        this.power = power;
        this.type = type;
        this.name = name;
        this.description = description;
        this.criticPercentage = criticPercentage;
        this.emoji = emoji;
    }   
    
}