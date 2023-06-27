import { Field, ID, InputType } from "@nestjs/graphql";
import { IsArray, IsUUID } from "class-validator";


@InputType()
export class FormPartInput {
    
    @Field(() => ID)
    @IsUUID()
    characterId : string;
    
    @Field(() => ID)
    @IsUUID()
    jobPositionId : string;
}


@InputType()
export class CreateFormPartInput {

    @Field(() => ID)
    @IsUUID()
    organizationId : string;
    
    @Field(() => [FormPartInput])
    @IsArray()
    charactersAndJobs : FormPartInput[];

}