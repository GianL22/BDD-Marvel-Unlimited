import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Character } from "src/characters/entities"
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Organization } from "./organization.entity"
import { JobPosition } from "./job-position.entity"

@ObjectType()
@Entity('FormPart')
export class FormPart{

    @PrimaryColumn({type: 'uuid'})
    @Field(() => ID)
    characterId : string

    @PrimaryColumn({type: 'uuid'})
    @Field(() => ID)
    organizationId : string
    
    @PrimaryColumn({type: 'uuid'})
    @Field(() => ID)
    jobPositionId : string


    @ManyToOne(
        () => Character,
        (character) => character.id,
        {lazy : true, nullable : false}
    )
    @JoinColumn({name:'characterId', foreignKeyConstraintName:'character_FK'})
    @Field(()=> Character)
    character: string;

    @ManyToOne(
        () => Organization,
        (organization) => organization.id,
        {lazy : true, nullable : false}
    )
    @JoinColumn({name:'organizationId', foreignKeyConstraintName:'organization_FK'})
    @Field(()=> Organization)
    organization: string;

    @ManyToOne(
        () => JobPosition,
        (jobPosition) => jobPosition.id,
        {lazy : true, nullable : false}
    )
    @JoinColumn({name:'jobPositionId', foreignKeyConstraintName:'jobPosition_FK'})
    @Field(()=> JobPosition)
    jobPosition: string;

}