
class Stats {

    private based: number;
    private hp: number;
    private atk: number;
    private def: number;
    private matk: number;
    private mdef: number;

    constructor() {
        this.based = 0;
        this.hp = 0;
        this.atk = 0;
        this.def = 0;
        this.matk = 0;
        this.mdef = 0;
    }

    public setBase(base: number) {
        this.based = base;
    }

    public setHp(hp: number) {
        this.hp = hp;
    }

    public setAtk(atk: number) {
        this.atk = atk;
    }

    public setDef(def: number) {
        this.def = def;
    }

    public setMatk(matk: number) {
        this.matk = matk;
    }

    public setMdef(mdef: number) {
        this.mdef = mdef;
    }

}