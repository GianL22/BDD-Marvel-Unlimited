import { IsOptional, IsString, IsUUID } from 'class-validator';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateHeroInput } from './create-hero.input';

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
}