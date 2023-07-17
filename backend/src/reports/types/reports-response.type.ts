import { Field, Int, ObjectType } from "@nestjs/graphql";
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


@ObjectType()
export class PlacesFightReportResponse{
    
    @Field(() => String)
    id : string

    @Field(() => String)
    name : string
    
    @Field(() => Int)
    count : number
    
    @Field(() => String)
    max : string

}

@ObjectType()
export class ObjectsMostUsedReportResponse{
    
    
    
    @Field(() => String)
    id : string

    @Field(() => String)
    name : string
    
    @Field(() => String)
    description : string

    @Field(() => String)
    type : string
    
    @Field(() => Int)
    count : string

}
