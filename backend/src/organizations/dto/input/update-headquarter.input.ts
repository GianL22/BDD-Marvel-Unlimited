import { IsNotEmpty, IsUUID } from 'class-validator';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateHeadquarterInput } from './create-headquarter.input';

@InputType()
export class UpdateHeadquarterInput extends PartialType(CreateHeadquarterInput) {
  
    @Field(() => ID)
    @IsUUID()
    id: string;

    @Field(() => ID)
    @IsUUID()
    organizationId: string;
}
