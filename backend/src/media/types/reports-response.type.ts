import { Field, ObjectType } from "@nestjs/graphql";
import { Movie, Serie } from "../entities";


@ObjectType()
export class SerieReportResponse {
    
    @Field(() => Number)
    avg : number;
    
    @Field(() => [Serie])
    series : Serie[];
}

@ObjectType()
export class MovieReportResponse {
    
    @Field(() => Number)
    avg : number;
    
    @Field(() => [Movie])
    movies : Movie[];
}