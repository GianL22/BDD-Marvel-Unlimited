import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateHeroInput } from './create-hero.input';
import { RelationsInput } from './create-character.input';

@InputType()
export class UpdateHeroInput extends PartialType(CreateHeroInput) {
  
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field( () => String, {nullable: true} )
  @IsString()
  @IsOptional()
  eyeColor?: string;

  @Field( () => String, {nullable: true} )
  @IsString()
  @IsOptional()
  hairColor?: string;

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