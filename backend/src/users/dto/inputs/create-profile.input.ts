import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";

@InputType()
export class CreateProfileInput {

    @Field( () => String)
    @IsString()
    nickname: string
    
    @Field( () => String)
    @IsString()
    language: string
 
    @Field( () => String)
    @IsString()
    device: string;

    @Field( () => String)
    @IsEmail()
    emailProfile: string;
}