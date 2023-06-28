import { Resolver, Mutation, Args, Query, ID, ResolveField, Parent } from '@nestjs/graphql';
import { CharactersService } from './characters.service';
import { Character } from './entities/character.entity';
import { CreateCharacterInput, CreateCivilInput, CreateHeroInput, CreateVillainInput, UpdateCivilInput, UpdateHeroInput, UpdateVillainInput } from './dto/inputs';
import { Civil, Hero, Villain } from './entities';
import { CharactersResponse } from './types/characters-response.type';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Character)
export class CharactersResolver {
  constructor(
    private readonly charactersService: CharactersService
  ) {}

  @Mutation(() => Villain, {name: 'createVillain'})
  async createVillain(
    @Args('createVillainInput') createVillainInput: CreateVillainInput,
    @Args('createCharacterInput') createCharacterInput: CreateCharacterInput,
  ): Promise<Villain> {
    return this.charactersService.createVillain(createVillainInput, createCharacterInput);
  }

  @Mutation(() => Hero, {name: 'createHero'})
  async createHero(
    @Args('createHeroInput') createHeroInput: CreateHeroInput,
    @Args('createCharacterInput') createCharacterInput: CreateCharacterInput,
  ): Promise<Hero> {
    return this.charactersService.createHero(createHeroInput, createCharacterInput);
  }

  @Mutation(() => Civil, {name: 'createCivil'})
  async createCivil(
    @Args('createCivilInput') createCivilInput: CreateCivilInput,
    @Args('createCharacterInput') createCharacterInput: CreateCharacterInput,
  ): Promise<Civil> {
    return this.charactersService.createCivil(createCivilInput, createCharacterInput);
  }

  @Query(() => CharactersResponse, { name: 'findCharacters' })
  async findCharacters(): Promise<CharactersResponse> {
    return this.charactersService.findCharacters();
  }

  @Query(() => [Character], { name: 'AllCharacters' })
  async findAll(): Promise<Character[]> {
    return this.charactersService.findAllCharacters()

  }

  @Mutation(() => Hero, {name: 'updateHero'})
  async updateHero(
    @Args('updateHeroInput') updateHeroInput: UpdateHeroInput, 
  ): Promise<Hero> {
    return this.charactersService.updateHero(updateHeroInput.id, updateHeroInput );
  }

  @Mutation(() => Villain, {name: 'updateVillain'})
  async updateVillain(
    @Args('updateVillainInput') updateVillainInput: UpdateVillainInput, 
  ): Promise<Villain> {
    return this.charactersService.updateVillain(updateVillainInput.id, updateVillainInput );
  }

  @Mutation(() => Civil, {name: 'updateCivil'})
  async updateCivil(
    @Args('updateCivilInput') updateCivilInput: UpdateCivilInput, 
  ): Promise<Civil> {
    return this.charactersService.updateCivil(updateCivilInput.id, updateCivilInput );
  }

  @Mutation(() => Boolean, {name: 'removeCharacter'})
  async removeCharacter(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    return this.charactersService.removeCharacter(id);
  }


  @Query(() => Hero, { name: 'hero' })
  async findHero(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Hero> {
    return this.charactersService.findOneHerorById(id);
  }

  @Query(() => Villain, { name: 'villain' })
  async findVillain(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Villain> {
    return this.charactersService.findOneVillainById(id);
  }

  @Query(() => Civil, { name: 'civil' })
  async findCivil(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Civil> {
    return this.charactersService.findOneCivilById(id);
  }

  @ResolveField(() => String, {name: 'nameCharacter'})
  async getName(
    @Parent() character: Character,
  ): Promise<string> {
    return this.charactersService.getNameCharacter( character.id );
  }


}
