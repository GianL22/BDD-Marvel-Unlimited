import { Field, ID, InputType, registerEnumType } from "@nestjs/graphql"
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"
import { RolActor } from "src/media/enums/rol-actor.enum"
import { RolCharacter } from "src/media/enums/rol-character.enum"

@InputType()
export class AppearsInput{


    @Field(() => ID)
    @IsUUID()
    characterId : string

    @Field(() => ID)
    @IsUUID()
    actorId : string

    @Field(() => RolCharacter)
    @IsString()
    rolCharacter : RolCharacter

    @Field(() => RolActor)
    @IsString()
    rolActor : RolActor
}


@InputType()
export class CreateAppearsInput{
    
    @Field(() => ID)
    @IsUUID()
    medioId : string

    @Field(() => [AppearsInput])
    @IsNotEmpty()
    @IsArray()
    appears : AppearsInput[]
}

registerEnumType( RolCharacter, { name : 'RolCharacter' })
registerEnumType( RolActor, { name : 'RolActor' })

