import { InputType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsUUID } from 'class-validator';

@InputType()
export class VideoGameProgressInput {

  @Field(  () => ID)
  @IsUUID()
  userId: string

  @Field( () => ID)
  @IsUUID()
  profileId: string

  @Field( () => ID)
  @IsUUID()
  videoGameId: string;

  @Field( () => Boolean)
  @IsBoolean()
  played: boolean;
}