import { InputType, Int, Field, Float, registerEnumType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsString, Min } from 'class-validator';

@InputType()
export class CreateCreditCardsInput {
    @Field(() => Int)
    @IsNotEmpty()
    cardNumber: number;

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    ownerName: string;

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    ownerLastName: string;

    @Field(() => Date)
    @IsNotEmpty()
    @IsDate()
    expiration: Date;
    
    @Field(() => Int)
    @IsNotEmpty()
    @Min(100)
    cvv: number;

}