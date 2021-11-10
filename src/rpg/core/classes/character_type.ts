export abstract class CharacterType {
    //FRONT_END = "front end dev",                // +mg +atk --def 
    //BACK_END = "back end dev",                  // +atk -mg -matk
    //DESIGNER = "designer",                      // ++mg -atk --def
    //MULTI_PLATFORMER = "multi platformer",      // -mg +++atk -def --matk

    abstract stats: Stats;

}