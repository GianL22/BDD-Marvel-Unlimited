import { GenericResponse } from "./Information";

export interface Fight {
    place:                    GenericResponse;
    date:                     Date;
    characterPowerAndObjects: CharacterPowerAndObject[];
}

export interface CharacterPowerAndObject {
    character:               GenericResponse;
    powerAndObjectUsedInput: PowerAndObjectUsedInput[];
}


export interface PowerAndObjectUsedInput {
    power:  GenericResponse | null;
    object: GenericResponse | null;
}