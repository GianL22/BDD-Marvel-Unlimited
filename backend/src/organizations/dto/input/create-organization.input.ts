import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Min } from 'class-validator';

@InputType()
export class CreateOrganizationInput {


  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  name: string;    

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  slogan: string;

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  objetive: string;

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  firstApparition: string;

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  leaderId : string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  founderId : string

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  placeId : string

}
