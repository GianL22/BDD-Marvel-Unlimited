import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities";
import { Column, Entity, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({name : 'CreditCards'})
@ObjectType()
export class CreditCard {
    @PrimaryColumn({
        type: 'int'
    })
    @Field(() => Int)
    cardNumber: number;
    @Column()
    ownerName: string;
    @Column()
    ownerLastName: string;
    @Column({
        type: 'date'
    })
    expiration: Date;
    @Column({
        type: 'int'
    })
    cvv: number;
    
    @OneToMany(() => User, user => user.creditCard)
    @Field(() => User, {nullable: true})
    user: User;
    
}