import { IsOptional, IsUUID } from 'class-validator';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateVillainInput } from './create-villain.input';

@InputType()
export class UpdateVillainInput extends PartialType(CreateVillainInput) {
  
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