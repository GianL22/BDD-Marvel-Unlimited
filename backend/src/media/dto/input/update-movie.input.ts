import { Field, ID, PartialType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";
import { CreateMovieInput } from "./create-movie.input";

export class UpdateMovieInput extends PartialType(CreateMovieInput) {


    @Field(() => ID, {nullable: false})
    @IsUUID()
    medioId : string    

}