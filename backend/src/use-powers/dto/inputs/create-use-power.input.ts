import { InputType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';
import { TypePower } from 'src/use-powers/enums/type-power.enum';

@InputType()
export class CreateUsePowerInput {

  @Field(() => ID)
  @IsUUID()
  characterId: string;

  @Field(() => ID)
  @IsUUID()
  powerId: string;

  @Field(() => TypePower)
  @IsNotEmpty()
  type: TypePower;

  @Field(() => Boolean)
  @IsBoolean()
  inherited: boolean;
}

registerEnumType( TypePower, { name : 'TypePower' })

