import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateCharacterInput {

  @Field( () => String )
  @IsString()
  eyeColor: string;

  @Field( () => String )
  @IsString()
  hairColor: string;
}
