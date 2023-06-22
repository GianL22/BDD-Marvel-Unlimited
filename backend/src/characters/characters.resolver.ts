import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { CharactersService } from './characters.service';
import { Character } from './entities/character.entity';
import { CreateCharacterInput, CreateCivilInput, CreateHeroInput, CreateVillainInput, UpdateCivilInput, UpdateHeroInput, UpdateVillainInput } from './dto/inputs';
import { Civil, Hero, Villain } from './entities';
import { CharacterResponse } from './types/character-response.type';
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

  @Query(() => CharacterResponse, { name: 'findCharacters' })
  async findCharacters(): Promise<CharacterResponse> {
    return this.charactersService.findCharacters();
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
  removeCharacter(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    return this.charactersService.removeCharacter(id);
  }
}
