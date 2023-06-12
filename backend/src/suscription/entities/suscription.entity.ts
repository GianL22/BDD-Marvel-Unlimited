import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Membership } from 'src/memberships/entities/membership.entity';
import { User } from 'src/users/entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({name : 'Suscription'})
@ObjectType()
export class Suscription {

  @PrimaryColumn({type: 'uuid'})
  userId: string;

  @PrimaryColumn({type: 'uuid'})
  membershipId: string;

  @PrimaryColumn({type: 'date'})
  dateSuscription: string;

  @Column({type: 'date', nullable: false})
  dateEnd: string;

  @Column({type: 'boolean', default: true, nullable: false})
  isActive: boolean;

  @ManyToOne(
    () => User,
    (user) => user.id,
    {}
  )
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(
    () => Membership,
    (membership) => membership.id,
    {}
  )
  @JoinColumn({ name: "membershipId" })
  membership: Membership;
}
