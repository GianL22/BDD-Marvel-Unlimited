import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from './person.entity';
import { Movie } from 'src/media/entities';

@Entity({name: 'Director'})
@ObjectType()
export class Director  extends Person{

  @OneToMany(
    ()=> Movie,
    (movie) => movie.director,
  )
  movie: Movie;

}
