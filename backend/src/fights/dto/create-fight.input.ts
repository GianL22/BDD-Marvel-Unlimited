import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsArray, IsDateString, IsOptional, IsUUID } from 'class-validator';






@InputType()
export class PowerAndObjectUsedInput{
  
  @IsOptional()
  @IsUUID()
  @Field(() => ID, {nullable : true})
  powerId: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, {nullable : true})
  objectId: string;

}


@InputType()
export class FightInput{

  @IsUUID()
  @Field(() => ID)
  characterId: string;
  
  @IsOptional()
  @IsArray()
  @Field(() => [PowerAndObjectUsedInput], {nullable : true})
  powerAndObjectUsedInput: PowerAndObjectUsedInput[]

}


@InputType()
export class CreateFightInput {


  @IsUUID()
  @Field(() => ID)
  placeId: string;

  @IsDateString()
  @Field(() => String, {nullable: false})
  date: string;

  @Field(() => [FightInput], {nullable: false})
  @IsArray()
  characterPowerAndObjects: FightInput[];

}
