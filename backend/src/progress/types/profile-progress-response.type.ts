import { Field, ObjectType } from '@nestjs/graphql';
import { MovieProgress, SerieProgress } from '../entities';

@ObjectType()
export class ProfileProgressResponse {

    @Field( () => [MovieProgress], {nullable: true})
    movies?: MovieProgress[];

    @Field( () => [SerieProgress], {nullable: true} )
    series?: SerieProgress[];
}