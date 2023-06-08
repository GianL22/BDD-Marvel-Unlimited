import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  //TODO Relaciones... Profiles, CreditCard and City
}
