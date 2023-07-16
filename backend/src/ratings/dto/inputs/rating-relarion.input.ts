import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { IsNumber, IsUUID, Max, Min } from 'class-validator';

@InputType()
export class RatingRelationInput {

  @Field(  () => ID)
  @IsUUID()
  userId: string

  @Field( () => ID)
  @IsUUID()
  profileId: string

  @Field( () => ID)
  @IsUUID()
  medioId: string;

  @Field( () => Float)
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
