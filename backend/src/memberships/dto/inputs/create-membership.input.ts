import { InputType, Int, Field, Float, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Min } from 'class-validator';
import { TypeMemberships } from 'src/memberships/enums/type-memberships.enum';

@InputType()
export class CreateMembershipInput {

    @Field(() => Float)
    @Min(0)
    price : number;

    @Field(() => TypeMemberships)
    @IsNotEmpty()
    type : TypeMemberships;
    
    @Field(() => String)
    @IsString()
    description : string;

}
registerEnumType( TypeMemberships, { name : 'TypeMemberships' })