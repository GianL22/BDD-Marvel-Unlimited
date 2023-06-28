import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Company } from 'src/companies/entities/company.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appears } from './appears.entity';
import { Participates } from './participates.entity';

@Entity({name: 'Medio'})
@ObjectType()
export class Medio{
    
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @ManyToOne(
        () => Company,
        (company) => company.medio,
        {nullable: false, lazy: true}
    )
    @JoinColumn({name: 'companyProduction', foreignKeyConstraintName:'company_FK'})
    @Field(() => Company)
    companyProduction: Company;


    @OneToMany(
        () => Appears,
        (appears) => appears.medio,
        {nullable: false, lazy: true}
    )
    @Field(() => [Appears])
    appears: Appears[];

    @OneToMany(
        () => Participates,
        (participates) => participates.medio,
        {nullable: false, lazy: true}
    )
    @Field(() => [Participates])
    participates: Participates[];

}
