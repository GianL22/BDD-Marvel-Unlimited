import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsNumber, IsUUID, Min } from 'class-validator';

@InputType()
export class SerieProgressInput {

  @Field(  () => ID)
  @IsUUID()
  userId: string

  @Field( () => ID)
  @IsUUID()
  profileId: string

  @Field( () => ID)
  @IsUUID()
  serieId: string;

  @Field( () => Int)
  @IsNumber()
  @Min(0)
  viewedEpisodes: number;
}