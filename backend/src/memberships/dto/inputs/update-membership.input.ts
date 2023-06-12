import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateMembershipInput } from './create-membership.input';

@InputType()
export class UpdateMembershipInput extends PartialType(CreateMembershipInput) {
  @Field(() => Int)
  id: number;
}
