import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Profile } from 'src/users/entities';
import { Serie } from 'src/media/entities';

@Entity({ name: 'SeriesProgress' })
@ObjectType()
export class SerieProgress {

    @PrimaryColumn({ type: "uuid" })
    userId: string;

    @PrimaryColumn({ type: "uuid" })
    @Field(()=> ID)
    profileId: string;

    @PrimaryColumn({ type: "uuid" })
    serieId: string;

    @Column({ nullable: false, name: 'viewedEpisodes' })
    @Check('"viewedEpisodes" >= 0')
    @Field(()=> Int)
    viewedEpisodes: number;

    @ManyToOne(
        () => Profile,
        { lazy: true }
    )
    @JoinColumn({ name: "profileId", referencedColumnName: 'id' })
    @JoinColumn({ name: "userId", referencedColumnName: 'userId', foreignKeyConstraintName: 'profile_FK' })
    profile: string;

    @ManyToOne(
        () => Serie,
        { lazy: true }
    )
    @JoinColumn({ name: "serieId", foreignKeyConstraintName: 'serie_FK' })
    @Field(()=>Serie)
    serie: Serie;
}
