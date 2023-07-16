import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RatingsResponse {
    
    @Field(() => Number, {nullable: true})
    ratingAvg : number;
    
    @Field(() => Number, {nullable: true} )
    ratingCount : number;
}