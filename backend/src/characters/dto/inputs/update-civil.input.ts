import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateCivilInput } from './create-civil.input';
import { RelationsInput } from './create-character.input';

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

  @Field(() => [RelationsInput], {nullable: true})
  @IsArray()
  @IsOptional()
  nacionalities?: RelationsInput[];

  @Field(() => [RelationsInput], {nullable: true})
  @IsArray()
  @IsOptional()
  objects?: RelationsInput[];

  @Field(() => [RelationsInput], {nullable: true})
  @IsArray()
  @IsOptional()
  occupations?: RelationsInput[];

  @Field(() => [RelationsInput], {nullable: true})
  @IsArray()
  @IsOptional()
  creators?: RelationsInput[];
}