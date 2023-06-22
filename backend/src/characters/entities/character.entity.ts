import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Color } from '../../colors/entities/color.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsePower } from 'src/use-powers/entities/use-power.entity';
import { UseObject } from 'src/use-objects/entities/use-object.entity';

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
    {nullable: false, lazy: true}
  )
  @JoinColumn({name:'eyeColor',foreignKeyConstraintName:'eyeColor_FK'})
  @Field( () => Color, {name: 'eyeColor'} )
  eyeColorId: string;

  @ManyToOne(
    () => Color,
    (color) => color.characterHairColor,
    {nullable: false, lazy: true}
  )
  @JoinColumn({name:'hairColor',foreignKeyConstraintName:'hairColor_FK'})
  @Field( () => Color, {name: 'hairColor'} )
  hairColorId: string;

  @OneToMany(
    () => UsePower,
    (usePower) => usePower.character,
    {lazy: true}
  )
  usePower: UsePower;

  @OneToMany(
    () => UseObject,
    (usePower) => usePower.character,
    {lazy: true}
  )
  useObject: UseObject;
}
