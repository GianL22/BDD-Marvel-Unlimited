import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Check, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from './character.entity';
import { Hero } from './hero.entity';
import { Civil } from './civil.entity';
// import { FightWith } from './fightWith.entity';

@Entity({name: 'Villain'})
@ObjectType()
export class Villain{
  
    @PrimaryColumn({ type: "uuid" })
    characterId: string;
  
    @ManyToOne(
        () => Character,
        (character) => character.villain,
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

    @Column({nullable: false, unique: true})
    @Field( ()=> String )
    nameVillain: string;

    @Column({nullable: false})
    @Field( ()=> String )
    objective: string;

    @OneToMany(
        () => Civil,
        (civil) => civil.villain,
    )
    civil: Civil;

    // @OneToMany(
    //     () => FightWith,
    //     (fightWith) => fightWith.hero
    // )
    // FightWith: string;

}
