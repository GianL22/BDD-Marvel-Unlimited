import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';
import { CreateMediaInput } from './create-media.input';

@InputType()
export class CreateSerieInput extends CreateMediaInput{

  @Field(() => String, {nullable: false})
  @IsNotEmpty()
  @IsString()
  channel : string;

  @Field(() => Int, {nullable: false})
  @Min(1)
  episodes : number;


  @Field(() => ID, {nullable: false})
  @IsUUID()
  creatorId : string;


  @Field(() => ID, {nullable: false})
  @IsUUID()
  audioVisualTypeId : string;

}
