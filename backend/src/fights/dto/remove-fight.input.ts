import { IsDateString, IsOptional, IsUUID } from 'class-validator';
import { CreateFightInput } from './create-fight.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class RemoveFightInput {
  

    @IsUUID()
    @Field(() => ID)
    placeId: string;
    
    @IsDateString()
    @Field(() => String)
    date: string;
    
    @IsUUID()
    @IsOptional()
    @Field(() => ID, { nullable : true})
    characterId ?: string;
    
    @IsUUID()
    @IsOptional()
    @Field(() => ID, { nullable : true})
    powerId ?: string;

    @IsUUID()
    @IsOptional()
    @Field(() => ID, { nullable : true})
    objectId ?: string;

}
