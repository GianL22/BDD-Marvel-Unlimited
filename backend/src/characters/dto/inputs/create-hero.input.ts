import { InputType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { TypeGender, TypeMaritialStatus } from '../../../characters/enums/type-characters.enum';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { RelationsInput } from './create-character.input';

@InputType()
export class CreateHeroInput {

  @Field( ()=> String )
  @IsString()
  name: string;

  @Field( ()=> String )
  @IsString()
  lastName: string;

  @Field( ()=> TypeGender )
  @IsNotEmpty()
  gender: TypeGender;

  @Field( ()=> String )
  @IsString()
  phrase: string;

  @Field( ()=> TypeMaritialStatus )
  @IsNotEmpty()
  maritialStatus: string;

  @Field( ()=> String )
  @IsString()
  firstApparition: string;

  @Field( ()=> String )
  @IsString()
  nameHero: string;

  @Field( ()=> String )
  @IsString()
  logo: string;

  @Field( ()=> String )
  @IsString()
  archEnemy: string;

  @Field(() => [RelationsInput])
  @IsArray()
  suitColors: RelationsInput[];
}

registerEnumType( TypeGender, { name : 'TypeGender' })

registerEnumType( TypeMaritialStatus, { name : 'TypeMaritialStatus' })