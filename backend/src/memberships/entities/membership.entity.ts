import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
