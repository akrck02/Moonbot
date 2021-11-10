import { CharacterType } from "./character_type";

export default class Wizard extends CharacterType {

    name : string;
    stats: Stats;

    constructor(){
        super();

        this.name = "Designer";
        this.stats = new Stats();

        this.stats.setBase(0);
        this.stats.setAtk(0);
        this.stats.setDef(0);
        this.stats.setMatk(0);
        this.stats.setMdef(0);
        this.stats.setHp(0);

    }

}