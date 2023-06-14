import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class SignupInput{

    @Field( () => String)
    @IsString()
    username: string
  
    @Field( () => String)
    @IsNotEmpty()
    name: string
  
    @Field( () => String)
    @IsNotEmpty()
    lastName: string;
  
    @Field( () => String)
    @IsEmail()
    email: string;
  
    @Field( () => String)
    @IsString()
    password: string;
  
    @Field( () => String)
    @IsDateString()
    birthdate: string;

    @Field(() => ID, {nullable: false})
    @IsNotEmpty()
    @IsUUID()
    city : string;

}