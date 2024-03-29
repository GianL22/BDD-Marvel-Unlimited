import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Check, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'Profiles' })
@ObjectType()
export class Profile {

    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @PrimaryColumn({ type: "uuid" })
    @Field(() => ID)
    userId: string;

    @Column()
    @Field(() => String)
    nickname: string

    @Column()
    @Field(() => String)
    @Check(`"language" IN ('Español', 'Inglés', 'Árabe','Hebreo')`)
    language: string

    @Column({
        default: 0,
        type: 'int',
    })
    @Field(() => Int)
    @Check(`"hourConexion" >= 0`)
    hourConexion: number;

    @Column()
    @Field(() => String)
    @Check(`"device" IN ('Laptop', 'Movil', 'Tablet')`)
    device: string;

    @Column({
        default: 0,
        type: 'int',
    })
    @Field(() => Int)
    @Check(`"timeWatched" >= 0`)
    timeWatched: number;

    @Column({ nullable: false })
    @Field(() => String)
    emailProfile: string;

    @Column({ nullable: false })
    @Field(() => String)
    avatar: string;

    @Column({ nullable: false, default: true })
    @Field(() => Boolean)
    isActive: boolean;

    @ManyToOne(
        () => User,
        (user) => user.id,
        { lazy: true }
    )
    @JoinColumn({ name: "userId", foreignKeyConstraintName: 'user_FK' })
    user: string;
}
