import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Fight } from 'src/fights/entities/fight.entity';
import { Headquarter } from 'src/organizations/entities/headquarter.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@ObjectType()
@Entity('Place')
export class Place {


    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string

    @Column()
    @Field(() => String)
    name: string

    @OneToMany(
        () => Organization,
        (organization) => organization.creationPlace,
    )
    organization: Organization

    @OneToMany(
        () => Headquarter,
        (headquarter) => headquarter.ubication,
    )
    headquarter: Headquarter

    @OneToMany(
        () => Fight,
        (fight)=> fight.place,
        {nullable: true, cascade: true}
      )
      fight : Fight 

}
