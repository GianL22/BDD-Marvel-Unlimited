import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Character } from '../../characters/entities/character.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


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
  @BeforeUpdate()
  checkDescriptionInsert(){
    this.description = this.description
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
  }
}
