import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Check, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Medio } from './medio.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Platform } from './platform.entity';


@Entity({ name: 'VideoGame' })
@ObjectType()
export class VideoGame {

  @PrimaryColumn({ type: "uuid" })
  @Field(() => ID)
  medioId: string;

  @OneToOne(
    () => Medio,
    { nullable: false, lazy: true, onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: "medioId", foreignKeyConstraintName: 'medio_FK' })
  @Field(() => Medio)
  medio: Medio;

  @Column({ nullable: false })
  @Field(() => String)
  title: string;

  @Column({
    nullable: false,
    type: 'date'
  })
  @Field(() => String)
  releaseDate: Date;

  @Column({ nullable: false })
  @Field(() => String)
  synopsis: string;

  @Column({ nullable: false })
  @Field(() => String)
  based: string;

  @Column({ nullable: false })
  @Field(() => String)
  type: string;

  @Column({ nullable: true })
  @Field(() => String)
  poster: string

  @ManyToOne(
    () => Company,
    (company) => company.videoGame,
    { nullable: false, lazy: true }
  )
  @JoinColumn({ name: 'companyPublisher', foreignKeyConstraintName: 'company_FK' })
  @Field(() => Company)
  companyPublisher: Company;


  @ManyToMany(
    () => Platform,
    { lazy: true }
  )
  @JoinTable({
    name: "VideoGamePlatform",
    joinColumn: {
      name: "videoGameId",
      referencedColumnName: "medioId",
      foreignKeyConstraintName: 'videoGame_FK'
    },
    inverseJoinColumn: {
      name: "platformId",
      referencedColumnName: "id",
      foreignKeyConstraintName: 'platform_FK'
    },
  })
  @Field(() => [Platform])
  platforms: Platform[]
}