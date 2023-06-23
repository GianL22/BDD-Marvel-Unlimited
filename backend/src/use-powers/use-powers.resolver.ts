import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, ID, Root } from '@nestjs/graphql';
import { UsePowersService } from './use-powers.service';
import { UsePower } from './entities/use-power.entity';
import { CharacterResponse } from './types/character-response.type';
import { CharactersService } from 'src/characters/characters.service';
import { CreateUsePowerInput } from './dto/inputs';
import { ParseUUIDPipe } from '@nestjs/common';
import { Villain } from 'src/characters/entities';
import { PowersService } from 'src/powers/powers.service';

interface ReportResponse {
  powerId:      string;
  characterIds: string[];
}

@Resolver(() => UsePower)
export class UsePowersResolver {
  constructor(
    private readonly usePowersService: UsePowersService,
    private readonly charactersService: CharactersService,
    private readonly powersService: PowersService,
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
    return this.charactersService.findCharacterById(usePowers.characterId);
  }

  @ResolveField( () => [Villain], {name: 'villain'} )
  async getVillainById(
    @Parent() usePowers: ReportResponse,
  ): Promise<Villain[]>{
    return this.charactersService.findVillain(usePowers.characterIds);
  }

  @ResolveField( () => String, {name: 'powerName'} )
  async getPowerName(
    @Parent() usePowers: ReportResponse,
  ): Promise<string>{
    return this.powersService.getPowerName(usePowers.powerId);
  }

  @ResolveField( () => String, {name: 'powerDescription'} )
  async getPowerDescription(
    @Parent() usePowers: ReportResponse,
  ): Promise<string>{
    return this.powersService.getPowerDescription(usePowers.powerId);
  }
}
