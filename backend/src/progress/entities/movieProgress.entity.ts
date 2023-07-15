import { ObjectType } from '@nestjs/graphql';
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Profile } from 'src/users/entities';
import { Movie } from 'src/media/entities';

@Entity({ name: 'MovieProgress' })
@ObjectType()
export class MovieProgress {

    @PrimaryColumn({ type: "uuid" })
    userId: string;

    @PrimaryColumn({ type: "uuid" })
    profileId: string;

    @PrimaryColumn({ type: "uuid" })
    movieId: string;

    @Column({ nullable: false, name: 'timeWatched' })
    @Check('"timeWatched" >= 0')
    timeWatched: number;

    @ManyToOne(
        () => Profile,
        { lazy: true }
    )
    @JoinColumn({ name: "profileId", referencedColumnName: 'id' })
    @JoinColumn({ name: "userId", referencedColumnName: 'userId', foreignKeyConstraintName: 'profile_FK' })
    profile: Profile;

    @ManyToOne(
        () => Movie,
        { lazy: true }
    )
    @JoinColumn({ name: "movieId", foreignKeyConstraintName: 'movie_FK' })
    movie: Movie;
}
