import { InputType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { TypeGender, TypeMaritialStatus } from '../../enums/type-characters.enum';
import { Villain } from 'src/characters/entities';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { RelationsInput } from './create-character.input';

@InputType()
export class CreateVillainInput {

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
  nameVillain: string;

  @Field( ()=> String )
  @IsString()
  objective: string;

  @Field(() => [RelationsInput])
  @IsArray()
  fightWith: RelationsInput[];
}

registerEnumType( TypeGender, { name : 'TypeGender' })

registerEnumType( TypeMaritialStatus, { name : 'TypeMaritialStatus' })


