import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Color } from '../../colors/entities/color.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Nacionality } from 'src/nacionality/entities/nacionality.entity';
import { UsePower } from 'src/powers/entities';
import { Objects } from 'src/objects/entities';
import { Occupation } from 'src/occupations/entities/occupation.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { Creator } from 'src/persons/entities';

@Entity({name: 'Character'})
@ObjectType()
export class Character{
  
  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID )
  id: string;

  @Column({nullable: false})
  eyeColor: string;

  @Column({nullable: false})
  hairColor: string;

  @ManyToOne(
    () => Color,
    (color) => color.characterEyeColor,
    {nullable: false, lazy: true, cascade: true}
  )
  @JoinColumn({name:'eyeColor',foreignKeyConstraintName:'eyeColor_FK'})
  @Field( () => Color, {name: 'eyeColor'} )
  eyeColorId: Color;

  @ManyToOne(
    () => Color,
    (color) => color.characterHairColor,
    {nullable: false, lazy: true, cascade: true}
  )
  @JoinColumn({name:'hairColor',foreignKeyConstraintName:'hairColor_FK'})
  @Field( () => Color, {name: 'hairColor'} )
  hairColorId: Color;

  @ManyToMany(
    () => Nacionality, 
    {lazy: true, onDelete: 'CASCADE'}
  )
  @JoinTable({
    name: "CharacterNacionality",
    joinColumn: {
      name: "characterId",
      referencedColumnName: "id",
      foreignKeyConstraintName:'character_FK'
    },
    inverseJoinColumn: {
      name: "nacionalityId",
      referencedColumnName: "id",
      foreignKeyConstraintName:'nacionality_FK'
    },
  })
  @Field(()=> [Nacionality])
  nacionalities: Nacionality[]

  @ManyToMany(
    () => Objects, 
    {lazy: true, onDelete: 'CASCADE'}
  )
  @JoinTable({
    name: "UseObject",
    joinColumn: {
      name: "characterId",
      referencedColumnName: "id",
      foreignKeyConstraintName:'character_FK'
    },
    inverseJoinColumn: {
      name: "objectId",
      referencedColumnName: "id",
      foreignKeyConstraintName:'Objects_FK'
    },
  })
  @Field(()=> [Objects])
  objects: Objects[]

  @ManyToMany(
    () => Occupation, 
    {lazy: true, onDelete: 'CASCADE'}
  )
  @JoinTable({
    name: "CharacterOcupation",
    joinColumn: {
      name: "characterId",
      referencedColumnName: "id",
      foreignKeyConstraintName:'character_FK'
    },
    inverseJoinColumn: {
      name: "occupationId",
      referencedColumnName: "id",
      foreignKeyConstraintName:'occupation_FK'
    },
  })
  @Field(()=> [Occupation])
  occupations: Occupation[]

  @ManyToMany(
    () => Creator, 
    {lazy: true, onDelete: 'CASCADE'}
  )
  @JoinTable({
    name: "CharacterCreator",
    joinColumn: {
      name: "characterId",
      referencedColumnName: "id",
      foreignKeyConstraintName:'character_FK'
    },
    inverseJoinColumn: {
      name: "creatorId",
      referencedColumnName: "id",
      foreignKeyConstraintName:'creator_FK'
    },
  })
  @Field(()=> [Creator])
  creators: Creator[]

  @OneToMany(
    () => UsePower,
    (usePower) => usePower.character,
    {lazy: true, cascade: true}
  )
  @Field(()=> [UsePower], {name:'powers'})
  usePower: UsePower;

  @OneToMany(
    () => Organization,
    (organization)=> organization.founder,
    {nullable: true, cascade: true}
  )
  founded : Organization 

  @OneToMany(
    () => Organization,
    (organization)=> organization.leader,
    {nullable: true, cascade: true}
  )
  leads : Organization 
}
