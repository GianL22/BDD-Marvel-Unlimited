import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateOccupationInput {
  @Field(()=> String)
  @IsString()
  name: string;
}
