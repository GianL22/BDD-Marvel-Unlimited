import { CreateUseObjectInput } from './create-use-object.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUseObjectInput extends PartialType(CreateUseObjectInput) {
  @Field(() => Int)
  id: number;
}
