import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectsType } from './objectType.entity';
// import { CreatedBy } from './createdBy.entity';
// import { Fight } from './fight.entity';

@Entity({name: 'Object'})
@ObjectType()
export class Objects{
  
  @PrimaryGeneratedColumn('uuid')
  @Field(()=> ID)
  id: string

  @Column({unique: true, nullable: false})
  @Field(()=> String)
  name: string;

  @Column({nullable: false})
  @Field(()=> String)
  description: string

  @Column({nullable: false})
  @Field(()=> String)
  material: string

  @Column({nullable: false})
  objectTypeId: string;

  @ManyToOne(
    () => ObjectsType,
    (objectType) => objectType.id,
    {nullable: false, lazy: true}
  )
  @JoinColumn({name:'objectTypeId',foreignKeyConstraintName:'objectType_FK'})
  @Field(()=> ObjectsType, {name: 'objectTypeId'})
  objectType: string;

  // @OneToMany(
  //   () => CreatedBy,
  //   (createdBy) => createdBy.character,
  // )
  // createdBy: string;

  // @OneToMany(
  //   () => Fight,
  //   (fight) => fight.character,
  // )
  // fight: string

  @BeforeInsert()
  @BeforeUpdate()
  checkInsert(){
    this.material = this.material
      .toLowerCase()
      .charAt(0).toUpperCase() + this.material.toLowerCase().slice(1)

    this.name = this.name
      .toLowerCase()
      .charAt(0).toUpperCase() + this.name.toLowerCase().slice(1)
  }
}
