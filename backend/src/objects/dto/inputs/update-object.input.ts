import { IsUUID } from 'class-validator';
import { CreateObjectInput } from './create-object.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateObjectInput extends PartialType(CreateObjectInput) {
  
  @Field(() => ID)
  @IsUUID()
  id: string;
}
