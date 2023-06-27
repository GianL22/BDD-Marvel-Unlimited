export interface CharactersResponse {
    findCharacters: FindCharacters;
}
  
interface FindCharacters {
    hero:    Hero[];
    villain: Villain[];
}

interface Hero {
    nameHero:  string;
    character: Character;
}

interface Character {
    id: string;
}

interface Villain {
    nameVillain: string;
    character:   Character;
}

interface Civil {
    name:      string;
    lastName:  string;
    character: Character;
}

interface Characters {
    hero:    Hero[];
    villain: Villain[];
    civil:   Civil[];
}

export interface DataResponse{
    findCharacters: Characters;
}