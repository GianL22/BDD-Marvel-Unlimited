import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Check, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Medio } from './medio.entity';
import { Company } from 'src/companies/entities/company.entity';


@Entity({name: 'VideoGame'})
@ObjectType()
export class VideoGame{
  
    @PrimaryColumn({ type: "uuid" })
    @Field(() => ID)
    medioId: string;
  
    @OneToOne(
        () => Medio,
        {nullable : false, lazy : true}
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
    type: string;
    
    @ManyToOne(
        () => Company,
        (company) => company.videoGame,
        {nullable: false, lazy : true}
    )
    @JoinColumn({name:'companyPublisher', foreignKeyConstraintName:'company_FK'})
    @Field(() => Company)
    companyPublisher: Company;

    // @OneToMany(
    //     () => VideoGameProgress,
    //     (videoGameProgress) => videoGameProgress.videoGame,
    // )
    // videoGameProgress: string;
}