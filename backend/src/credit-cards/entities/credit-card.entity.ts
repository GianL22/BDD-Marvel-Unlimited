import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities";
import { Column, Entity, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({name : 'CreditCards'})
@ObjectType()
export class CreditCard {

    @PrimaryColumn()
    @Field(() => String)
    cardNumber: string;

    @Column({nullable: false})
    ownerName: string;

    @Column({nullable: false})
    ownerLastName: string;

    @Column({
        type: 'date',
        nullable: false
    })
    expiration: Date;

    @Column({
        type: 'int',
        nullable: false
    })
    cvv: number;
    
    @OneToMany(() => User, user => user.creditCard)
    user: User;
    
}