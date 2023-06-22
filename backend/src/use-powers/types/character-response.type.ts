import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Civil, Hero, Villain } from '../../characters/entities';

@ObjectType()
export class CharacterResponse {

    @Field(() =>ID)
    id: string;
    
    @Field(() =>ID)
    eyeColor: string;
    
    @Field(() =>ID)
    hairColor: string;

    @Field(() =>Hero, {nullable: true})
    hero?: Hero;

    @Field(() =>Villain, {nullable: true})
    villain?: Villain;

    @Field(() =>Civil, {nullable: true})
    civil?: Civil;

}