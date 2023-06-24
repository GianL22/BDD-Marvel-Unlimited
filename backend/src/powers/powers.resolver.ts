import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';
import { PowersService } from './powers.service';
import { CreatePowerInput, CreateUsePowerInput, UpdatePowerInput, UpdateUsePowerInput } from './dto/inputs';
import { ParseUUIDPipe } from '@nestjs/common';
import { UsePower, Power } from './entities';
import { Villain } from 'src/characters/entities';
import { CharactersService } from 'src/characters/characters.service';

interface ReportResponse {
  powerId:      string;
  characterIds: string[];
}

@Resolver(() => Power)
export class PowersResolver {
  constructor(
    private readonly powersService: PowersService,
    private readonly charactersService: CharactersService,
  ) {}

  @Mutation(() => Power,{ name:'createPower' })
  async create(
    @Args('createPowerInput') createPowerInput: CreatePowerInput,
  ): Promise<Power> {
    return this.powersService.create(createPowerInput);
  }

  @Query(() => [Power], { name: 'Powers' })
  async findAll(): Promise<Power[]> {
    return this.powersService.findAll();
  }

  @Mutation(() => Power, {name: 'updatePower'})
  async update(
    @Args('updatePowerInput') updatePowerInput: UpdatePowerInput, 
  ): Promise<Power> {
    return this.powersService.update(updatePowerInput.id, updatePowerInput );
  }

  @Mutation(() => Boolean, {name: 'removePower'})
  remove(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    return this.powersService.remove(id);
  }
  
  //*Resolver para usePower
  @Mutation(() => UsePower, {name: 'updateCharacterPower'})
  async updateCharacterPower(
    @Args('updateUsePowerInput') updateUsePowerInput: UpdateUsePowerInput, 
  ): Promise<UsePower> {
    return this.powersService.updateRelation(updateUsePowerInput.powerId, updateUsePowerInput.characterId, updateUsePowerInput );
  }

  @Mutation(() => Boolean, {name: 'removePowerFromCharacter'})
  async removePowerFromCharacter(
    @Args('characterId', { type: () => ID }, ParseUUIDPipe) characterId: string,
    @Args('powerId', { type: () => ID }, ParseUUIDPipe) powerId: string,
  ): Promise<boolean> {
    return this.powersService.removeRelation(characterId, powerId);
  }

  //* ResolveField para el Reporte.
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
