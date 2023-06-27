import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { BuildingType } from "src/organizations/entities/building-type.entity";
import { Place } from "src/places/entities/place.entity";


@InputType()
export class CreateHeadquarterInput{
    
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => ID)
    @IsUUID()
    organizationId: string;   

    @Field(() => ID)
    @IsUUID()
    @IsNotEmpty()
    ubicationId: string

    @Field(() => ID)
    @IsUUID()
    @IsNotEmpty()
    buildingTypeId: string


}