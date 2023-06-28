import { Field, ObjectType } from "@nestjs/graphql";
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Organization } from "../../organizations/entities/organization.entity";
import { Medio } from "src/media/entities";

@ObjectType()
@Entity('Participates')
export class Participates{
    
    @PrimaryColumn({ type : 'uuid'})
    organizationId : string
    
    @PrimaryColumn({ type : 'uuid'})
    medioId : string

    @Column()
    @Field(() => String)
    status : string

    @Column()
    @Field(() => String)
    @Check(`"rolOrganization" IN ('Enemiga', 'Protagonista', 'Secundaria')`)
    rolOrganization : string 

    @ManyToOne(
        () => Medio,
        (medio)=> medio.id,
        {nullable: false, lazy : true, onDelete:'CASCADE'}
    )
    @JoinColumn({name:'medioId', foreignKeyConstraintName:'medio_FK'})
    @Field(()=> Medio, {name: 'medio'})
    medio: string

    @ManyToOne(
        () => Organization,
        (organization)=> organization.id,
        {nullable: false, lazy : true, onDelete:'CASCADE'}
    )
    @JoinColumn({name:'organizationId', foreignKeyConstraintName:'organization_FK'})
    @Field(()=> Organization, {name: 'organization'})
    organization: string

}