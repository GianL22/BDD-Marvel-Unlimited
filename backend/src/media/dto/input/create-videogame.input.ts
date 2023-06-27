import { Field, ID, InputType } from "@nestjs/graphql";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { CreateMediaInput } from "./create-media.input";
import { RelationsInput } from "src/characters/dto/inputs/create-character.input";



@InputType()
export class CreateVideoGameInput extends CreateMediaInput {

    @Field(() => String, {nullable: false})
    @IsNotEmpty()
    @IsString()
    type : string

    @Field(() => ID, {nullable: false})
    @IsNotEmpty()
    @IsString()
    companyPublisherId : string


    @Field(() => [RelationsInput])
    @IsArray()
    platforms: RelationsInput[];
    

}