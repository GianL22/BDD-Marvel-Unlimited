import { InputType, Field, ID } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateSuscriptionInput {
  
  @Field(() => ID, {nullable: false})
  @IsNotEmpty()
  @IsUUID()
  membership : string;

  @Field(() => String, {nullable: false})
  @IsNotEmpty()
  @IsDateString()
  dateSuscription : string; 

}
