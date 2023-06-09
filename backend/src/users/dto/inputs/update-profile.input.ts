import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateProfileInput } from './create-profile.input';

@InputType()
export class UpdateProfileInput extends PartialType(CreateProfileInput) {
  
    @Field(() => ID)
    @IsUUID()
    id: string;

    @Field( () => Boolean,  {nullable: true})
    @IsBoolean()
    @IsOptional()
    isActive?: boolean

    @Field( () => Int,  {nullable: true})
    @IsOptional()
    hourConexion?: number

    @Field( () => Int,  {nullable: true})
    @IsOptional()
    timeWatched?: number

}
