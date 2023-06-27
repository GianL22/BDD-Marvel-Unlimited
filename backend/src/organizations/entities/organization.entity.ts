import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Character } from 'src/characters/entities';
import { Place } from 'src/places/entities/place.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Organization')
@ObjectType()
export class Organization {

  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID) 
  id : string
  
  @Column({nullable: false, unique : true})
  @Field( () => String )
  name: string;    

  @Column({nullable: false})
  @Field( () => String )
  slogan: string;

  @Column({nullable: false})
  @Field( () => String )
  objetive: string;

  @Column({nullable: false})
  @Field( () => String )
  firstApparition: string;


  @ManyToOne(
    () => Place,
    (place) => place.organization,
    {nullable: false, lazy: true}
  )
  @Field( () => Place )
  @JoinColumn({name:'placeCreation', foreignKeyConstraintName:'place_FK'})
  creationPlace : Place


  @ManyToOne(
    () => Character,
    (character)=> character.founded,
    {nullable: false, lazy : true}
  )
  @JoinColumn({name:'founder', foreignKeyConstraintName:'founderCharacter_FK'})
  @Field( () => Character )
  founder: Character

  @ManyToOne(
    () => Character,
    (character)=> character.leads,
    {nullable: false, lazy : true}
  )
  @JoinColumn({name:'leader', foreignKeyConstraintName:'leaderCharacter_FK'})
  @Field( () => Character)
  leader: Character



// @OneToMany(
//     () => Headquarter,
//     (headquarter) => headquarter.nameHeadquarter
//   )
//   headquarter: string;

//   @OneToMany(
//     () => FormPart,
//     (formPart) => formPart.character,
// )
// characterFormPart: string;

// @OneToMany(
//     () => Participate,
//     (participate) => participate.medio
// )
// participate: string;
}
