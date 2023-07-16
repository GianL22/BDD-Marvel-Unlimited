import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsNumber, IsUUID, Min } from 'class-validator';

@InputType()
export class MovieProgressInput {

  @Field(  () => ID)
  @IsUUID()
  userId: string

  @Field( () => ID)
  @IsUUID()
  profileId: string

  @Field( () => ID)
  @IsUUID()
  movieId: string;

  @Field( () => Int)
  @IsNumber()
  @Min(0)
  timeWatched: number;
}