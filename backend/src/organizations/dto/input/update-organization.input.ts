import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateOrganizationInput } from './create-organization.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateOrganizationInput extends PartialType(CreateOrganizationInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
