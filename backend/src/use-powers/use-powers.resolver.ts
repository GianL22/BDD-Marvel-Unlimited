import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, ID } from '@nestjs/graphql';
import { UsePowersService } from './use-powers.service';
import { UsePower } from './entities/use-power.entity';
import { Power } from 'src/powers/entities/power.entity';
import { PowersService } from '../powers/powers.service';
import { CharacterResponse } from './types/character-response.type';
import { CharactersService } from 'src/characters/characters.service';
import { CreateUsePowerInput } from './dto/inputs';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => UsePower)
export class UsePowersResolver {
  constructor(
    private readonly usePowersService: UsePowersService,
    private readonly powersRepository: PowersService,
    private readonly charactersRepository: CharactersService,
  ) {}

  @Mutation(() => UsePower, {name: 'relatePower'})
  async createUsePower(
    @Args('createUsePowerInput') createUsePowerInput: CreateUsePowerInput,
  ): Promise<UsePower> {
    return this.usePowersService.create(createUsePowerInput);
  }

  @Query(() => [UsePower], { name: 'usePowers' })
  async findAll(): Promise<UsePower[]> {
    return this.usePowersService.findAll();
  }

  @Mutation(() => Boolean, {name: 'removePowerFromCharacter'})
  async removePowerFromCharacter(
    @Args('characterId', { type: () => ID }, ParseUUIDPipe) characterId: string,
    @Args('powerId', { type: () => ID }, ParseUUIDPipe) powerId: string,
  ): Promise<boolean> {
    return this.usePowersService.remove(characterId, powerId);
  }

  @ResolveField( () => CharacterResponse, {name: 'character'} )
  async getCharacterById(
    @Parent() usePowers: UsePower,
  ): Promise<CharacterResponse>{
    return this.charactersRepository.findCharacterById(usePowers.characterId);
  }

  // @ResolveField( () => Power, {name: 'power'} )
  // async getPowerById(
  //   @Parent() usePowers: UsePower,
  // ): Promise<Power>{
  //   return this.powersRepository.findOneById(usePowers.powerId);
  // }
}
