import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { CreateSerieInput } from "./create-serie.input";
import { IsUUID } from "class-validator";


@InputType()
export class UpdateSerieInput extends PartialType(CreateSerieInput) {


    @Field(() => ID, {nullable: false})
    @IsUUID()
    medioId : string    



}