import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

@InputType()
export class CreateCreditCardInput {

    @Field(() => String)
    @IsString()
    cardNumber: string;

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    ownerName: string;

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    ownerLastName: string;

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    expiration: string;
    
    @Field(() => Int)
    @IsNotEmpty()
    @Min(100)
    @Max(999)
    cvv: number;

}