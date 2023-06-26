import { ObjectType, Field } from '@nestjs/graphql';
import { Character } from 'src/characters/entities';
import { Power } from 'src/powers/entities/power.entity';
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({name: 'UsePower'})
@ObjectType()
export class UsePower {

  @PrimaryColumn({ type: "uuid" })
  characterId: string;

  @PrimaryColumn({ type: 'uuid' })
  powerId: string;
  
  @Column({nullable: false})
  @Field( () => String)
  @Check(`"type" IN ('Natural', 'Artificial')`)
  type: string;

  @Column({nullable: false})
  @Field( () => Boolean)
  inherited: boolean;

  @ManyToOne(
    () => Power,
    (power) => power.usePower,
    {lazy: true}
  )
  @JoinColumn({name:'powerId'})
  @Field(()=> Power)
  power: Power 

  @ManyToOne(
    () => Character,
    (character) => character.usePower,
    {lazy: true}
  )
  @JoinColumn({name:'characterId'})
  character: string;
}
