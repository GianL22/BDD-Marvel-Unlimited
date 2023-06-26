import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateObjectsTypeInput {

  @Field(()=> String)
  @IsString()
  description: string

}
