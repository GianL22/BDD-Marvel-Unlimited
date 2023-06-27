import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { Organization } from './organization.entity';
import { Place } from 'src/places/entities/place.entity';
import { BuildingType } from './building-type.entity';

@Entity({name: 'Headquarter'})
@ObjectType()
export class Headquarter{
  
    @PrimaryColumn({ type : 'uuid'})
    organizationId: string;   
    
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id : string

    @Column()
    @Field(() => String)
    name: string;

    @ManyToOne(
        () => Place,
        (place)=> place.headquarter,
        {nullable: false, lazy : true}
    )
    @JoinColumn({name:'ubication', foreignKeyConstraintName:'place_FK'})
    @Field(() => Place)
    ubication: Place

    @ManyToOne(
        () => BuildingType,
        ( buildingType )=> buildingType.id,
        {nullable: false, lazy : true}
    )
    @JoinColumn({name:'buildingType', foreignKeyConstraintName:'buildingType_FK'})
    @Field(() => BuildingType)
    buildingType: BuildingType

    @ManyToOne(
        () => Organization,
        (organization)=> organization.id,
        {nullable: false, lazy : true, onDelete:'CASCADE'}
    )
    @JoinColumn({name:'organizationId', foreignKeyConstraintName:'organization_FK'})
    @Field(()=> Organization, {name: 'organization'})
    organization: string
}
