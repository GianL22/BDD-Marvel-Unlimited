import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Suscription } from 'src/suscription/entities/suscription.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name : 'Memberships'})
@ObjectType()
export class Membership {

    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id : string;

    @Column({
        type : 'float',
        nullable : false
    })
    @Field(() => Float)
    price : number;

    @Column({
        unique   : true,
        nullable : false
    })
    @Field(() => String)
    type  : string;

    @Column({nullable : false})
    @Field(() => String)
    description : string;   

    @OneToMany(
        () => Suscription,
        (suscription) => suscription.isActive,
        {lazy: true}
      )
      suscription: Suscription;
}
