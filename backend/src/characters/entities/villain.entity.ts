import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Check, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from './character.entity';
import { Civil } from './civil.entity';

@Entity({name: 'Villain'})
@ObjectType()
export class Villain{
  
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
    nameVillain: string;

    @Column({nullable: false})
    @Field( ()=> String )
    objective: string;

    @OneToMany(
        () => Civil,
        (civil) => civil.villain,
        {lazy: true}
    )
    civil: Civil;

    @ManyToMany(
        () => Villain, 
        {lazy: true, onDelete: 'CASCADE'}
      )
    @JoinTable({
      name: "FightWith",
      joinColumn: {
        name: "villainId",
        referencedColumnName: "characterId",
        foreignKeyConstraintName:'villain_FK'
      },
      inverseJoinColumn: {
        name: "heroId",
        referencedColumnName: "characterId",
        foreignKeyConstraintName:'hero_FK'
      },
    })
    @Field(()=> [Villain])
    suitColors: Villain[]

    // @OneToMany(
    //     () => FightWith,
    //     (fightWith) => fightWith.hero
    // )
    // FightWith: string;

}
