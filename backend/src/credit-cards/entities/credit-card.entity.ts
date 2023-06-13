import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities";
import { Column, Entity, PrimaryColumn, ManyToOne, OneToMany, Check } from 'typeorm';

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
        type: "varchar",
        nullable: false,
    })
    @Check(`expiration ~ '^(0[1-9]|1[0-2])\/([0-9]{2})$'`)
    expiration: string;

    @Column({
        type: 'int',
        nullable: false
    })
    cvv: number;
    
    @OneToMany(() => User, user => user.creditCard)
    user: User;
    
}