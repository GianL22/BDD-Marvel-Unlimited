import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
  @BeforeUpdate()
  checkDescriptionInsert(){
    this.description = this.description
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ");
  }
}
