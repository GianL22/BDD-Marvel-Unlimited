import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from './person.entity';
import { Serie } from 'src/media/entities/serie.entity';


@Entity({name: 'Creator'})
@ObjectType()
export class Creator extends Person{

    @OneToMany(
        () => Serie,
        (serie) => serie.creator,
        {lazy : true}
    )
    serie: Serie;

//   @OneToMany(
//     () => CreateCharacter,
//     (createCharacter) => createCharacter.character
//   )
//   createCharacter: string
}
