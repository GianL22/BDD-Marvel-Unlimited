import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Check, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Medio } from './medio.entity';
import { Creator } from 'src/persons/entities';
import { AudioVisualType } from '../types/audiovisual-type.entity';

@Entity({name: 'Serie'})
@ObjectType()
export class Serie{
  
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
    @Field(() => String)
    based: string;

    @Column({nullable: false})
    @Field(() => String)
    channel: string;
    
    @Column({nullable: false})
    @Check('episodes > 0')
    @Field(() => String)
    episodes: number;

    @Column( {nullable: true})
    @Field( ()=> String)
    poster: string

    @ManyToOne(
        () => Creator,
        (creator) => creator.serie,
        {nullable: false, lazy : true}
    )
    @JoinColumn({name:'creator', foreignKeyConstraintName:'creator_FK'})
    @Field(() => Creator)
    creator: Creator;

    @ManyToOne(
        () => AudioVisualType,
        (audioVisualType) => audioVisualType.serie,
        {nullable: false, lazy: true}
    )
    @JoinColumn({name:'audioVisualType', foreignKeyConstraintName:'audiovisualType_FK'})
    @Field(() => AudioVisualType)
    audioVisualType: AudioVisualType;
}
