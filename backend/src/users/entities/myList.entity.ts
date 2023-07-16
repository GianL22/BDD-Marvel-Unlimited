import { ObjectType } from '@nestjs/graphql';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Profile } from './profile.entity';
import { Medio } from 'src/media/entities';

@Entity({ name: 'MyList' })
@ObjectType()
export class MyList {

    @PrimaryColumn({ type: "uuid" })
    userId: string;

    @PrimaryColumn({ type: "uuid" })
    profileId: string;

    @PrimaryColumn({ type: "uuid" })
    medioId: string;

    @ManyToOne(
        () => Profile,
        { lazy: true }
    )
    @JoinColumn({ name: "profileId", referencedColumnName: 'id' })
    @JoinColumn({ name: "userId", referencedColumnName: 'userId', foreignKeyConstraintName: 'profile_FK' })
    profile: string;

    @ManyToOne(
        () => Medio,
        { lazy: true }
    )
    @JoinColumn({ name: "medioId", foreignKeyConstraintName: 'medio_FK' })
    medio: string;
}
