import { Field, ObjectType } from "@nestjs/graphql";
import { Character } from "src/characters/entities";
import { Objects } from "src/objects/entities";
import { Place } from "src/places/entities/place.entity";
import { Power } from "src/powers/entities";

@ObjectType()
export class FightResponse {

    @Field( () => Place)
    place:                  Place;
    @Field( () => String)
    date:                     string;
    @Field( () => [CharacterPowerAndObject])
    characterPowerAndObjects: CharacterPowerAndObject[];
}

@ObjectType()
export class CharacterPowerAndObject {
    
    @Field( () => Character)
    character:             Character;
    @Field( () => [PowerAndObjectUsedInputElement])
    powerAndObjectUsedInput: PowerAndObjectUsedInputElement[];
}

@ObjectType()
export class PowerAndObjectUsedInputElement {
    @Field( () => Power, {nullable : true})
    power ?:   Power;
    @Field( () => Objects, {nullable : true})
    object ?:  Objects;
}
