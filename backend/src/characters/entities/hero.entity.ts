import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Check, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from './character.entity';
import { Villain } from './villain.entity';
import { Civil } from './civil.entity';
// import { FightWith } from './fightWith.entity';

@Entity({name: 'Hero'})
@ObjectType()
export class Hero{
  
    @PrimaryColumn({ type: "uuid" })
    characterId: string;
  
    @OneToOne(
        () => Character,
        (character) => character.id,
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
    nameHero: string;

    @Column({nullable: false})
    @Field( ()=> String )
    logo: string;

    @Column({nullable: false})
    archEnemy: string;

    @OneToOne(
        () => Villain,
        (villain) => villain.characterId,
        {nullable: false, lazy: true}
    )
    @JoinColumn({name:'archEnemy', foreignKeyConstraintName:'villain_FK'})
    @Field( ()=> Villain, {name: 'archEnemy'} )
    villain: Villain;

    @OneToMany(
        () => Civil,
        (civil) => civil.hero,
    )
    civil: string

    //TODO: Recordar hacer la tabla de peleas
    // @OneToMany(
    //     () => FightWith,
    //     (fightWith) => fightWith.hero
    // )
    // FightWith: string;

}
