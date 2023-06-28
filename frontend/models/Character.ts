export interface CharactersResponse {
    findCharacters: FindCharacters;
}
  
interface FindCharacters {
    hero:    Hero[];
    villain: Villain[];
}

export interface Hero {
    nameHero:  string;
    character: Character;
}

interface Character {
    id: string;
}

export interface Villain {
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

export interface CivilAll {
    name:            string;
    lastName:        string;
    gender:          string;
    phrase:          string;
    maritialStatus:  string;
    firstApparition: string;
    hero:            Hero | null;
    villain:         {nameVillain: string} | null;
    character:       CharacterColor;
}

export interface CharacterColor {
    eyeColor:  Color;
    hairColor: Color;
}

export interface Color {
    description: string;
}

export interface Hero {
    nameHero: string;
}

export interface VillainAll {
    name:            string;
    lastName:        string;
    gender:          string;
    phrase:          string;
    maritialStatus:  string;
    firstApparition: string;
    nameVillain:     string;
    objective:       string;
    character:       CharacterColor;
}

export interface HeroAll {
    name:            string;
    lastName:        string;
    gender:          string;
    phrase:          string;
    maritialStatus:  string;
    firstApparition: string;
    nameHero:        string;
    objective:       string;
    logo:            string;
    archEnemy:       {nameVillain: string}
    character:       CharacterColor;
}