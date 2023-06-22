import { InputType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { TypeGender, TypeMaritialStatus } from '../../enums/type-characters.enum';
import { Villain } from 'src/characters/entities';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateCivilInput {

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

  @Field( ()=> String, {nullable: true})
  @IsOptional()
  heroId?: string;

  @Field( ()=> String, {nullable: true})
  @IsOptional()
  villainId?: string;
}

registerEnumType( TypeGender, { name : 'TypeGender' })

registerEnumType( TypeMaritialStatus, { name : 'TypeMaritialStatus' })
