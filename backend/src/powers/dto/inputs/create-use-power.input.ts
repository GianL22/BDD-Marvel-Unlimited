import { InputType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';
import { TypePower } from 'src/powers/enums/type-power.enum';

@InputType()
export class UsePowerInput{
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

@InputType()
export class CreateUsePowerInput {

  @Field(() => ID)
  @IsUUID()
  characterId: string;

  @Field(()=> [UsePowerInput])
  @IsArray()
  powers: UsePowerInput[];

}

registerEnumType( TypePower, { name : 'TypePower' })

