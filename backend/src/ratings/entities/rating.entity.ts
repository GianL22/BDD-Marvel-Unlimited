import { ObjectType } from '@nestjs/graphql';
import { Medio } from 'src/media/entities';
import { Profile } from 'src/users/entities';
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Rating' })
@ObjectType()
export class Rating {

  @PrimaryColumn({ type: "uuid" })
  userId: string;

  @PrimaryColumn({ type: "uuid" })
  profileId: string;

  @PrimaryColumn({ type: "uuid" })
  medioId: string;

  @Column({
    type: 'real'
  })
  @Check('rating BETWEEN 1 AND 5')
  rating: number

  @ManyToOne(
    () => Profile,
    { lazy: true }
  )
  @JoinColumn({ name: "profileId", referencedColumnName: 'id' })
  @JoinColumn({ name: "userId", referencedColumnName: 'userId', foreignKeyConstraintName: 'profile_FK' })
  profile: Profile;

  @ManyToOne(
    () => Medio,
    { lazy: true }
  )
  @JoinColumn({ name: "medioId", foreignKeyConstraintName: 'medio_FK' })
  medio: Medio;
}
