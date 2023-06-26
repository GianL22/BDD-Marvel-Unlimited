import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'Nacionality'})
@ObjectType()
export class Nacionality{
  
  @PrimaryGeneratedColumn('uuid')
  @Field(()=>ID)
  id: string;

  @Column({nullable: false, unique: true})
  @Field( ()=> String )
  name: string

  @BeforeInsert()
  @BeforeUpdate()
  checkNameInsert(){
    this.name = this.name
      .toLowerCase()
      .charAt(0).toUpperCase() + this.name.toLowerCase().slice(1)
  }
}
