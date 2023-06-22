import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateObjectInput {

  @Field(()=> String)
  @IsString()
  name: string;

  @Field(()=> String)
  @IsString()
  description: string

  @Field(()=> String)
  @IsString()
  material: string
  
  @Field(()=> String)
  @IsUUID()
  objectTypeId: string;
}
