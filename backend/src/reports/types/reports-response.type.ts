import { Field, ObjectType } from "@nestjs/graphql";
import { VideoGame } from "src/media/entities";
import { Power } from "src/powers/entities";

@ObjectType()
export class VideoGameReportResponse {

    @Field(() => Number)
    avg: number;

    @Field(() => [VideoGame])
    videoGames: VideoGame[];
}

@ObjectType()
export class NaturalPowersReportResponse {

    @Field(() => String)
    characterName: string;

    @Field(() => String)
    characterRol: string;

    @Field(() => String)
    organizationName: string

    @Field(() => [Power])
    naturalPowers: Power[];
}