import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Check, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from './character.entity';
import { Hero } from './hero.entity';
import { Villain } from './villain.entity';

@Entity({name: 'Civil'})
@ObjectType()
export class Civil{
    
    @PrimaryColumn({ type: "uuid" })
    characterId: string;

    @ManyToOne(
        () => Character,
        (character) => character.civil,
        {lazy: true, onDelete: 'CASCADE'}
    )
    @JoinColumn({ name: "characterId", foreignKeyConstraintName:'character_FK' })
    @Field( ()=> Character )
    character: Character;
    
    @Column({nullable: false})
    @Field( ()=> String )
    name: string;

    @Column({nullable: false})
    @Field( ()=> String )
    lastName: string;

    @Column({nullable: false})
    @Check(`"gender" IN ('M', 'F', 'Desc','Otro')`)
    @Field( ()=> String )
    gender: string;

    @Column({nullable: false})
    @Field( ()=> String )
    phrase: string;

    @Column({nullable: false})
    @Check(`"maritialStatus" IN ('Soltero', 'Casado', 'Viudo','Divorciado')`)
    @Field( ()=> String )
    maritialStatus: string;

    @Column({nullable: false})
    @Field( ()=> String )
    firstApparition: string;

    @ManyToOne(
        () => Hero,
        (hero)=> hero.civil,
        {nullable: true, lazy: true}
    )
    @JoinColumn({ name: "heroId", foreignKeyConstraintName:'hero_FK' })
    @Field( ()=> Hero, {nullable: true})
    hero: Hero

    @ManyToOne(
        () => Villain,
        (villain)=> villain.civil,
        {nullable: true, lazy: true}
    )
    @JoinColumn({ name: "villainId", foreignKeyConstraintName:'villain_FK' })
    @Field( ()=> Villain, {nullable: true})
    villain: Villain
}
