import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'Occupation'})
@ObjectType()
export class Occupation {

  @PrimaryGeneratedColumn('uuid')
  @Field(()=> ID)
  id: string;

  @Column({nullable: false})
  @Field(()=> String)
  name: string;
}
