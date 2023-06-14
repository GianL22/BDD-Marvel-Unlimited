import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Country } from "./country.entity";

@Entity({name: 'City'})
@ObjectType()
export class City {

    @PrimaryGeneratedColumn('uuid')
    @Field(()=> ID)
    id : string;

    @Column()
    @Field(()=> String)
    description : string;

    @OneToMany(() => User, user => user.city, {nullable : false, lazy : true})
    user : User;
    
    @ManyToOne(() => Country, (country) => country.city, { nullable : false, lazy: true })
    @Field(() => Country)
    country : Country
}