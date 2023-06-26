import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreatePowerInput {

  @Field(()=> String)
  @IsString()
  name: string;

  @Field(()=> String)
  @IsString()
  description: string
}
