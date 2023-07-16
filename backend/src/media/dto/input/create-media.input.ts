import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateMediaInput {

  @Field(() => String, {nullable: false})
  @IsNotEmpty()
  @IsString()
  title : string;
  
  @Field(() => ID,{nullable: false})
  @IsUUID()
  @IsNotEmpty()
  companyId : string


  @Field(() => String, {nullable: false})
  @IsNotEmpty()
  @IsString()
  synopsis : string;

  @Field(() => String, {nullable: false})
  @IsNotEmpty()
  @IsString()
  based : string;

  @Field(() => String, {nullable: false})
  @IsNotEmpty()
  @IsDateString()
  releaseDate : string;

  @Field(() => String, {nullable: false})
  @IsNotEmpty()
  @IsString()
  poster : string;
  

}
