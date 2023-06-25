import { Field, ObjectType } from '@nestjs/graphql';
import { Actor, Creator, Director } from '../entities';


@ObjectType()
export class PersonsResponse {

    @Field(() => [Actor], { nullable: true })
    actors : Actor[];

    @Field(() => [Director], { nullable: true })
    directors : Director[];
    
    @Field(() => [Creator], { nullable: true })
    creators : Creator[];

}