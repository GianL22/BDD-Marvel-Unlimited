import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './profile.entity';
import { CreditCard } from 'src/credit-cards/entities/credit-card.entity';
import { Suscription } from 'src/suscription/entities/suscription.entity';

@Entity({name: 'users'})
@ObjectType()
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID)
  id: string;

  @Column()
  @Field( () => String)
  username: string

  @Column()
  @Field( () => String)
  name: string

  @Column()
  @Field( () => String)
  lastName: string;

  @Column({ unique: true })
  @Field( () => String)
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'date'
  })
  @Field( () => String)
  birthdate: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  @Field( () => Boolean)
  isActive: boolean;

  @ManyToOne(
    () => CreditCard, 
    (creditCard) => creditCard.user, 
    {lazy : true}
  )
  @Field(() => CreditCard)
  creditCard : CreditCard;

  
  @OneToMany(
    () => Profile,
    (profile) => profile.id,
    {lazy: true}
  )
  profile: Profile;

  
  @OneToMany(
    () => Suscription,
    (suscription) => suscription.userId,
    {lazy: true}
  )
  suscription: Suscription;
}
