import { Field, ID, InputType, registerEnumType } from "@nestjs/graphql"
import { IsArray, IsOptional, IsString, IsUUID, isArray } from "class-validator"
import { RolOrganization } from "src/media/enums/rol-organization.enum"


@InputType()
export class ParticipatesInput {
    
    @Field(() => ID)
    @IsUUID()
    organizationId : string
    
    @Field(() => String)
    @IsString()
    status : string

    @Field(() => RolOrganization)
    @IsString()
    rolOrganization : RolOrganization

}

@InputType()
export class CreateParticipatesInput {

    @Field(() => [ParticipatesInput], {nullable : true})
    @IsArray()
    @IsOptional()
    organizationsParticipates ? : ParticipatesInput[]

    @Field(() => ID)
    @IsUUID()
    medioId : string

}



registerEnumType( RolOrganization, { name : 'RolOrganization' })
