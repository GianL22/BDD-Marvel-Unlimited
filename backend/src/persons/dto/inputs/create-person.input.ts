import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreatePersonInput {

    @IsString()
    @Field(() => String)
    name: string
    
    @IsString()
    @Field(() => String)
    lastName: string
}
