import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Character } from 'src/characters/entities';
import { Objects } from 'src/objects/entities';
import { Place } from 'src/places/entities/place.entity';
import { Power } from 'src/powers/entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('Fight')
@Unique(['character', 'power', 'object', 'place', 'date'])
@ObjectType()
export class Fight {
  
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID) 
  id : string

  @Column({
    nullable: false, 
    type:'date'
  })
  @Field(() => String )
  date: string;

  @ManyToOne(
    () => Character,
    (character) => character.fight,
    {eager : true, nullable : false}
  )
  @JoinColumn({name:'characterId', foreignKeyConstraintName:'character_FK'})
  @Field(()=> Character)
  character: Character;

  @ManyToOne(
    () => Power,
    (power) => power.fight,
    {eager : true, nullable : true}
  )
  @JoinColumn({name:'powerId', foreignKeyConstraintName:'power_FK'})
  @Field(()=> Power, {nullable : true})
  power: Power;

  @ManyToOne(
    () => Objects,
    (object) => object.fight,
    {eager : true, nullable : true}
  )
  @JoinColumn({name:'objectId', foreignKeyConstraintName:'object_FK'})
  @Field(()=> Objects, {nullable : true})
  object: Objects;

  @ManyToOne(
    () => Place,
    (place) => place.fight,
    {eager : true},
  )
  @JoinColumn({name:'placeId', foreignKeyConstraintName:'place_FK'})
  @Field(()=> Place)
  place: Place;

}
