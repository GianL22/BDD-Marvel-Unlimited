import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Headquarter } from "./headquarter.entity"


@ObjectType()
@Entity({name: 'BuildingType'})
export class BuildingType {

    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id : string
    
    @Column()
    @Field(() => String)
    description : string

    @OneToMany(
        () => Headquarter,
        ( headquarter )=> headquarter.buildingType,
        {nullable: true, cascade: true}
    )
    headquarter : Headquarter 


}

