import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from './person.entity';


@Entity({name: 'Creators'})
@ObjectType()
export class Creator extends Person{

//   @OneToMany(
//     () => Serie,
//     (serie) => serie.medioId,
//   )
//   serie: string;

//   @OneToMany(
//     () => CreateCharacter,
//     (createCharacter) => createCharacter.character
//   )
//   createCharacter: string
}
