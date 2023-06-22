import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Character } from 'src/characters/entities';
import { UsePower } from 'src/use-powers/entities/use-power.entity';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
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

  // @OneToMany(
  //   () => Fight,
  //   (fight) => fight.character,
  // )
  // fight: string

  @BeforeInsert()
  checkNameInsert(){
      this.name = this.name
          .toLowerCase()
  }
}
