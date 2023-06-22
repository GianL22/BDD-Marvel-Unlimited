import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';
import { UseObjectsService } from './use-objects.service';
import { UseObject } from './entities/use-object.entity';
import { CharactersService } from 'src/characters/characters.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { CharacterResponse } from 'src/use-powers/types/character-response.type';
import { CreateUseObjectInput } from './dto/inputs';

@Resolver(() => UseObject)
export class UseObjectsResolver {
  constructor(
    private readonly useObjectsService: UseObjectsService,
    private readonly charactersRepository: CharactersService,
    ) {}

  @Mutation(() => UseObject, {name: 'relateObject'})
  async createUseObject(
    @Args('createUseObjectInput') createUseObjectInput: CreateUseObjectInput,
  ): Promise<UseObject> {
    return this.useObjectsService.create(createUseObjectInput);
  }

  @Query(() => [UseObject], { name: 'UseObjects' })
  async findAll(): Promise<UseObject[]> {
    return this.useObjectsService.findAll();
  }

  @Mutation(() => Boolean, {name: 'removeObjectFromCharacter'})
  async removeObjectFromCharacter(
    @Args('characterId', { type: () => ID }, ParseUUIDPipe) characterId: string,
    @Args('objectId', { type: () => ID }, ParseUUIDPipe) objectId: string,
  ): Promise<boolean> {
    return this.useObjectsService.remove(characterId, objectId);
  }

  @ResolveField( () => CharacterResponse, {name: 'character'} )
  async getCharacterById(
    @Parent() useObjects: UseObject,
  ): Promise<CharacterResponse>{
    return this.charactersRepository.findCharacterById(useObjects.characterId);
  }
}
