import { Field, ObjectType } from '@nestjs/graphql';
import { Character } from 'src/characters/entities';
import { Objects } from 'src/objects/entities';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({name: 'UseObject'})
@ObjectType()
export class UseObject {
    
  @PrimaryColumn({type: "uuid"})
  characterId: string;

  @PrimaryColumn({type: "uuid"})
  objectId: string;

  @ManyToOne(
      () => Character,
      (character) => character.useObject,
      {lazy: true}
  )
  @JoinColumn({ name: "characterId", foreignKeyConstraintName:'character_FK' })
  character: string;

  @ManyToOne(
      () => Objects,
      (object) => object.useObject,
      {lazy: true}
  )
  @JoinColumn({ name: "objectId", foreignKeyConstraintName:'object_FK' })
  @Field(()=> Objects)
  object: string;
}
