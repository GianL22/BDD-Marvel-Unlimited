import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Membership } from 'src/memberships/entities/membership.entity';
import { User } from 'src/users/entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({name : 'Suscription'})
@ObjectType()
export class Suscription {

  @PrimaryColumn({type: 'uuid'})
  @Field(()=> ID)
  userId: string;

  @PrimaryColumn({type: 'uuid'})
  @Field(()=> ID)
  membershipId: string;

  @PrimaryColumn( { type : 'date' } )
  @Field(()=> Date)
  dateSuscription: Date;

  @Column( { type : 'date' } )
  @Field(()=> Date)
  dateEnd: Date;

  @Column({type: 'boolean', default: true, nullable: false})
  @Field(()=> Boolean)
  isActive: boolean;


  @ManyToOne(
    () => User,
    (user) => user.id,
    {lazy : true},
  )
  @JoinColumn({ name: "userId" })
  @Field(()=> User)
  user: string;

  @ManyToOne(
    () => Membership,
    (membership) => membership.id,
    {lazy : true}
  )
  @JoinColumn({ name: "membershipId" })
  @Field(()=> Membership)
  membership: string;
  
}
