import { IsOptional, IsUUID } from 'class-validator';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateCivilInput } from './create-civil.input';

@InputType()
export class UpdateCivilInput extends PartialType(CreateCivilInput) {
  
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field( () => ID,  {nullable: true})
  @IsUUID()
  @IsOptional()
  eyeColor?: string

  @Field( () => ID,  {nullable: true})
  @IsUUID()
  @IsOptional()
  hairColor?: string
}