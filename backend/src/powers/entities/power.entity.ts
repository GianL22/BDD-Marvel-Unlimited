import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm';
import { UsePower } from './use-power.entity';
import { Fight } from 'src/fights/entities/fight.entity';
// import { Fight } from './fight.entity';

@Entity({name: 'Power'})
@ObjectType()
export class Power {
  
  @PrimaryGeneratedColumn('uuid')
  @Field(()=> ID)
  id: string

  @Column({nullable: false, unique: true})
  @Field(()=> String)
  name: string;

  @Column({nullable: false})
  @Field(()=> String)
  description: string

  @OneToMany(
    () => UsePower,
    (usePower) => usePower.power,
    { lazy: true }
  )
  usePower: UsePower;

  @OneToMany(
    () => Fight,
    (fight)=> fight.power,
    {nullable: true, cascade: true}
  )
  fight : Fight 

  // @OneToMany(
  //   () => Fight,
  //   (fight) => fight.character,
  // )
  // fight: string

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
