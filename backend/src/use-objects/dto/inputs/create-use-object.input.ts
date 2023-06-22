import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CreateUseObjectInput {
  
  @Field( ()=> ID )
  @IsUUID()
  characterId: string;

  @Field( ()=> ID )
  @IsUUID()
  objectId: string;
}
