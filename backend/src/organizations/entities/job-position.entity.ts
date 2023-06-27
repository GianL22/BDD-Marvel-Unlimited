import { Field, ID, InputType, ObjectType } from "@nestjs/graphql"
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"


@ObjectType()
@Entity('JobPosition')
export class JobPosition {

    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id : string

    @Column()
    @Field(() => String)
    name : string

}