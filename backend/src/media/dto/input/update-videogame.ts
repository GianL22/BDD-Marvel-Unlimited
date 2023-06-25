import { Field, ID, PartialType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";
import { CreateVideoGameInput } from "./create-videogame.input";

export class UpdateVideoGameInput extends PartialType(CreateVideoGameInput) {


    @Field(() => ID, {nullable: false})
    @IsUUID()
    medioId : string    

}