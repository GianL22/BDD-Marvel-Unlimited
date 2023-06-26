import { IsUUID } from 'class-validator';
import { CreateNacionalityInput } from './create-nacionality.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateNacionalityInput extends PartialType(CreateNacionalityInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
