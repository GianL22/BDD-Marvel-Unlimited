import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCompanyInput {


  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  description: string;

}
