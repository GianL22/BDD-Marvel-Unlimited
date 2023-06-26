import { IsUUID } from 'class-validator';
import { CreatePowerInput } from './create-power.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePowerInput extends PartialType(CreatePowerInput) {

  @Field(() => ID)
  @IsUUID()
  id: string;
}
