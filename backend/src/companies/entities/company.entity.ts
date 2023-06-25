import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Medio, Movie } from 'src/media/entities';
import { VideoGame } from 'src/media/entities/videogame.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';


@Entity({name: 'Company'})
@ObjectType()
export class Company{
  
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({nullable: false, unique: true})
  @Field(() => String)
  description: string

  @OneToMany(
    ()=> Medio,
    (medio) => medio.companyProduction,
    { nullable : false, lazy: true }
  )
  medio: Medio;

  @OneToMany(
    ()=> Movie,
    (movie) => movie.companyDist,
    { nullable : false, lazy: true }
  )
  movie : Movie;

  @OneToMany(
    ()=> VideoGame,
    (videoGame) => videoGame.companyPublisher,
    { nullable : false, lazy: true }
  )
  videoGame: VideoGame;

  // @OneToMany(
  //   ()=> Movie,
  //   (movie) => movie.medioId
  // )
  // movie: string;

  // @OneToMany(
  //   ()=> VideoGame,
  //   (videoGame) => videoGame.medioId
  // )
  // videoGame: string;
}
