import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Objects } from './object.entity';

@Entity({name: 'ObjectType'})
@ObjectType()
export class ObjectsType {
  
  @PrimaryGeneratedColumn('uuid')
  @Field(()=> ID)
  id: string;

  @Column({nullable: false})
  @Field(()=> String)
  description: string

  @OneToMany(
    () => Objects,
    (object) => object.objectType,
    {lazy: true}
  )
  objects: Objects;

  @BeforeInsert()
  checkDescriptionInsert(){
    this.description = this.description
      .toLowerCase()
      .charAt(0).toUpperCase() + this.description.toLowerCase().slice(1)
  }
}
