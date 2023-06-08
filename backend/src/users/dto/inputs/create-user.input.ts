import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDateString, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {

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
}
