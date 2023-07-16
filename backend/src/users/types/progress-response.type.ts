import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProgressResponse {

    @Field( () => Int, {nullable: true})
    movieProgress?: number;

    @Field( () => Int, {nullable: true} )
    serieProgress?: number;

    @Field( () => Boolean, {nullable: true} )
    videoGameProgress?: boolean;
}