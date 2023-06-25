import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePersonInput {

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    name: string
    
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    lastName: string
}
