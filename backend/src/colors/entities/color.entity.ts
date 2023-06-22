import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Character } from '../../characters/entities/character.entity';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity({name: 'Color'})
@ObjectType()
export class Color{
  
  @PrimaryGeneratedColumn('uuid')
  @Field(()=> ID)
  id: string;

  @Column({nullable: false})
  @Field(()=> String)
  description: string

  @OneToMany(
    () => Character,
    (character) => character.eyeColorId,
    {lazy: true}
  )
  characterEyeColor: Character;

  @OneToMany(
    () => Character,
    (character) => character.hairColorId,
    {lazy: true}
  )
  characterHairColor: Character;

  // @OneToMany(
  //   () => SuitColors,
  //   (suitColors) => suitColors.character,
  // )
  // characterSuitColor: string

  @BeforeInsert()
  checkDescriptionInsert(){
      this.description = this.description
          .toLowerCase()
          .charAt(0).toUpperCase() + this.description.toLowerCase().slice(1)
  }
}
