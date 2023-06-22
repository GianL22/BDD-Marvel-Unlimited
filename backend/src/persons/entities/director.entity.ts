import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from './person.entity';

@Entity({name: 'Directors'})
@ObjectType()
export class Director  extends Person{
  


  // @OneToMany(
  //   ()=> Movie,
  //   (movie) => movie.medioId
  // )
  // movie: string;
}
