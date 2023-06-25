import { Field, ObjectType } from "@nestjs/graphql";
import { Movie, Serie, VideoGame } from "../entities";

@ObjectType()
export class MediaResponse {

    @Field(() => [Serie], { nullable: true })
    series ?: Serie[];

    @Field(() => [Movie], { nullable: true })
    movies ?: Movie[];

    @Field(() => [VideoGame], { nullable: true })
    videoGames ?: VideoGame[]
}