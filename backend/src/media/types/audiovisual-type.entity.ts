import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Serie } from "../entities/serie.entity"
import { Movie } from "../entities/movie.entity"


@Entity('AudiovisualType')
@ObjectType()
export class AudioVisualType {

    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id : string

    @Column({nullable: false})
    @Field(() => String)
    description : string


    @OneToMany(
        () => Serie,
        (serie) => serie.audioVisualType,
        {nullable: false, lazy : true}
    )
    serie: Serie;


    @OneToMany(
        () => Movie,
        (movie) => movie.audioVisualType,
        {nullable: false, lazy : true}
    )
    movie: Movie;

}