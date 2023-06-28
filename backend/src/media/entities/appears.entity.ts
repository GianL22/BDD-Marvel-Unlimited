import { Field, ObjectType } from "@nestjs/graphql";
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Medio } from ".";
import { Actor } from "src/persons/entities";
import { Character } from "src/characters/entities";

@ObjectType()
@Entity('Appears')
export class Appears {

    @PrimaryColumn({ type : 'uuid'})
    characterId : string

    @PrimaryColumn({ type : 'uuid'})
    medioId : string

    @PrimaryColumn({ type : 'uuid'})
    actorId : string

    @Column()
    @Check(`"rolCharacter" IN ('Antagonista', 'Protagonista', 'Secundario')`)
    @Field(() => String)
    rolCharacter : string

    @Column()
    @Check(`"rolActor" IN ('Interpretado', 'Voz')`)
    @Field(() => String)
    rolActor : string

    @ManyToOne(
        () => Medio,
        (medio)=> medio.id,
        {nullable: false, lazy : true, onDelete:'CASCADE'}
    )
    @JoinColumn({name:'medioId', foreignKeyConstraintName:'medio_FK'})
    @Field(()=> Medio, {name: 'medio'})
    medio: string

    @ManyToOne(
        () => Actor,
        (actor)=> actor.id,
        {nullable: false, lazy : true, onDelete:'CASCADE'}
    )
    @JoinColumn({name:'actorId', foreignKeyConstraintName:'actor_FK'})
    @Field(()=> Actor, {name: 'actor'})
    actor: string

    @ManyToOne(
        () => Character,
        (character)=> character.id,
        {nullable: false, lazy : true, onDelete:'CASCADE'}
    )
    @JoinColumn({name:'characterId', foreignKeyConstraintName:'character_FK'})
    @Field(()=> Character, {name: 'character'})
    character : string

}