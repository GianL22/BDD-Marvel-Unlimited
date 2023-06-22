import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export abstract class Person {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({nullable: false})
  @Field(() => String)
  name: string

  @Column({nullable: false})
  @Field(() => String)
  lastName: string

}
