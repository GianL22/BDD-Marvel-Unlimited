
import { CreateUsePowerInput } from './create-use-power.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUsePowerInput extends PartialType(CreateUsePowerInput) {}
