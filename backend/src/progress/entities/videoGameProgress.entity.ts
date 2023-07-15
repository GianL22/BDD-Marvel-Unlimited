import { ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Profile } from 'src/users/entities';
import { VideoGame } from 'src/media/entities';

@Entity({ name: 'VideoGameProgress' })
@ObjectType()
export class VideoGameProgress {

    @PrimaryColumn({ type: "uuid" })
    userId: string;

    @PrimaryColumn({ type: "uuid" })
    profileId: string;

    @PrimaryColumn({ type: "uuid" })
    videoGameId: string;

    @Column({ nullable: false, name: 'played' })
    played: boolean;

    @ManyToOne(
        () => Profile,
        { lazy: true }
    )
    @JoinColumn({ name: "profileId", referencedColumnName: 'id' })
    @JoinColumn({ name: "userId", referencedColumnName: 'userId', foreignKeyConstraintName: 'profile_FK' })
    profile: Profile;

    @ManyToOne(
        () => VideoGame,
        { lazy: true }
    )
    @JoinColumn({ name: "videoGameId", foreignKeyConstraintName: 'videoGame_FK', referencedColumnName:'medioId' })
    videoGame: VideoGame;
}
