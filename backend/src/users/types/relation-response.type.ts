import { Field, ObjectType } from '@nestjs/graphql';
import { Medio } from 'src/media/entities';

@ObjectType()
export class RelationResponse {

    @Field(() => String)
    profileId: string;

    @Field(() => [Medio], { nullable: true })
    medios: Medio[];
}