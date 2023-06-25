import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Company } from 'src/companies/entities/company.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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


}
