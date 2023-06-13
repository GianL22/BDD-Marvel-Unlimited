import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({name: 'profiles'})
@ObjectType()
export class Profile {
    
    //* Implementar luego la clave debil
    @PrimaryGeneratedColumn('uuid')
    @Field( () => ID)
    id: string;

    @PrimaryColumn({ type: "uuid" })
    @Field( () => ID)
    userId: string;

    @Column()
    @Field( () => String)
    nickname: string
    
    @Column()
    @Field( () => String)
    language: string
    
    @Column({
        default: 0,
        type: 'int',
    })
    @Field( () => Int)
    hourConexion: number;
    
    @Column()
    @Field( () => String)
    device: string;
    
    @Column({
        default: 0,
        type: 'int',
    })
    @Field( () => Int)
    timeWatched: number;
    
    @Column({ unique: true })
    @Field( () => String)
    emailProfile: string;

    @Column( {nullable: false})
    @Field( () => String)
    avatar: string;

    @ManyToOne(
        () => User,
        (user) => user.id,
        {lazy: true}
    )
    @JoinColumn({ name: "userId" })
    user: string;
    //TODO: Realizar la relación luego con la entidad user
}
