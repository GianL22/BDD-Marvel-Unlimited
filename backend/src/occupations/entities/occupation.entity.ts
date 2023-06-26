import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'Occupation'})
@ObjectType()
export class Occupation {

  @PrimaryGeneratedColumn('uuid')
  @Field(()=> ID)
  id: string;

  @Column({nullable: false})
  @Field(()=> String)
  name: string;

  @BeforeInsert()
  @BeforeUpdate()
  checkNameInsert(){
    this.name = this.name
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ");
  }
}
