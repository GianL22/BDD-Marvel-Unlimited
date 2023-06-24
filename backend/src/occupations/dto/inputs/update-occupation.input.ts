import { IsUUID } from 'class-validator';
import { CreateOccupationInput } from './create-occupation.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateOccupationInput extends PartialType(CreateOccupationInput) {
  @Field(() => ID)
  @IsUUID()
  id: number;
}
