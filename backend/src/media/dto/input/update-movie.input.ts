import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";
import { CreateMovieInput } from "./create-movie.input";

@InputType()
export class UpdateMovieInput extends PartialType(CreateMovieInput) {

    @Field(() => ID, {nullable: false})
    @IsUUID()
    medioId : string    

}