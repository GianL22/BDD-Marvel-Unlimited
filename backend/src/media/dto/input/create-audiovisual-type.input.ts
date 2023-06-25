import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';


@InputType()
export class CreateAudioVisualTypeInput {

  @Field(() => String, {nullable: false})
  @IsNotEmpty()
  @IsString()
  description : string;

}
