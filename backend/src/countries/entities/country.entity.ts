import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { City } from './city.entity';

@Entity({name: 'Country'})
@ObjectType()
export class Country {
    @PrimaryColumn()
    @Field(()=> String)
    description : string;
    @OneToMany(() => City, city => city.country, {nullable : false, lazy : true})
    city : City;
}