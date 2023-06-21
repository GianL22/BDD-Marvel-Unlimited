import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateColorInput {

  @Field(() => String, { description: 'Se guarda el nombre del color' })
  @IsString()
  description: string;

}
