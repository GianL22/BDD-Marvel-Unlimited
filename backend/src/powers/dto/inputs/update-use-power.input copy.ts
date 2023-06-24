import { IsUUID } from 'class-validator';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { UsePowerInput } from './create-use-power.input';

@InputType()
export class UpdateUsePowerInput extends PartialType(UsePowerInput) {
  
  @Field(() => ID)
  @IsUUID()
  characterId: string;
}
