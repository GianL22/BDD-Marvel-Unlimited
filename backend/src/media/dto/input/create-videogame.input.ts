import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateMediaInput } from "./create-media.input";



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

}