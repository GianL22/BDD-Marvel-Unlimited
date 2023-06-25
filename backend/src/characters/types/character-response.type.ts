import { Field, ObjectType } from '@nestjs/graphql';
import { Civil, Hero, Villain } from '../entities';

@ObjectType()
export class CharacterResponse {

    @Field( () => [Hero], {nullable: true} )
    hero?: Hero[];

    @Field( () => [Villain], {nullable: true} )
    villain?: Villain[];

    @Field( () => [Civil], {nullable: true} )
    civil?: Civil[];

}