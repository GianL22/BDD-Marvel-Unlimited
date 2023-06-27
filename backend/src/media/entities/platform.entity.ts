import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Platform')
@ObjectType()
export class Platform {
    

    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id : string;

    @Column()
    @Field(() => String)
    name : string;


}