import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Check, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Medio } from '.';
import { Company } from 'src/companies/entities/company.entity';
import { Director } from 'src/persons/entities';
import { AudioVisualType } from '../types/audiovisual-type.entity';

@Entity({name: 'Movie'})
@ObjectType()
export class Movie{
  
    @PrimaryColumn({ type: "uuid" })
    @Field(() => ID)
    medioId: string;
  
    @OneToOne(
        () => Medio,
        {nullable: false, lazy: true, onDelete: 'CASCADE'}
    )
    @JoinColumn({ name: "medioId", foreignKeyConstraintName:'medio_FK' })
    @Field(() => Medio)
    medio: Medio;
    
    @Column({nullable: false})
    @Field(() => String)
    title: string;

    @Column({
        nullable: false, 
        type:'date'
    })
    @Field(() => String)
    releaseDate: Date;

    @Column({nullable: false})
    @Field(() => String)
    synopsis: string;

    @Column({nullable: false})
    @Check('duration > 0')
    @Field(() => Int)
    duration: number;

    @Column({nullable: false})
    @Field(() => String)
    based: string;

    @Column({nullable: false, type: 'real'})
    @Check('cost > 0')
    @Field(() => Float)
    cost: number;

    @Column({nullable: false, type: 'real'})
    @Check('revenue > 0')
    @Field(() => Float)
    revenue: number;

    @ManyToOne(
        () => Director,
        (director) => director.movie,
        {nullable: false, lazy : true}
    )
    @JoinColumn({name:'director', foreignKeyConstraintName:'director_FK'})
    @Field(() => Director)
    director: Director;

    @ManyToOne(
        () => Company,
        (company) => company.movie,
        {nullable: false, lazy : true}
    )
    @JoinColumn({name:'companyDist', foreignKeyConstraintName:'company_FK'})
    @Field(() => Company)
    companyDist: Company;

    @ManyToOne(
        () => AudioVisualType,
        (audiovisualType) => audiovisualType.id,
        {nullable: false, lazy : true}
    )
    @JoinColumn({name:'audioVisualType',foreignKeyConstraintName:'audiovisualType_FK'})
    @Field(() => AudioVisualType)
    audioVisualType: AudioVisualType;

    // @OneToMany(
    //     () => MovieProgress,
    //     (movieProgress) => movieProgress.movie
    // )
    // movieProgress: string;
}
