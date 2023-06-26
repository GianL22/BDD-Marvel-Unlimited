import { InputType, Field, ID } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class RelationsInput{
  @Field(()=> ID )
  @IsUUID()
  id: string;
}

@InputType()
export class CreateCharacterInput {

  @Field( () => String )
  @IsString()
  eyeColor: string;

  @Field( () => String )
  @IsString()
  hairColor: string;

  @Field(() => [RelationsInput])
  @IsArray()
  nacionalities: RelationsInput[];

  @Field(() => [RelationsInput], {nullable: true})
  @IsArray()
  @IsOptional()
  objects?: RelationsInput[];

  @Field(() => [RelationsInput])
  @IsArray()
  occupations: RelationsInput[];
}
