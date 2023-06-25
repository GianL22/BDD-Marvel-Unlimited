import { InputType, Int, Field, ID, Float } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';
import { CreateMediaInput } from './create-media.input';

@InputType()
export class CreateMovieInput extends CreateMediaInput{

    @Field(() => Int, {nullable: false})
    @IsNumber()
    @Min(0)
    duration: number;

    @Field(() => Float, {nullable: false})
    @IsNumber()
    @Min(0)
    cost: number;

    @Field(() => Float, {nullable: false})
    @IsNumber()
    @Min(0)
    revenue: number;

    @Field(() => ID, {nullable: false})
    @IsUUID()
    directorId : string;
    
    @Field(() => ID, {nullable: false})
    @IsUUID()
    audioVisualTypeId : string;
    
    @Field(() => ID, {nullable: false})
    @IsUUID()
    companyDistId : string;
}
