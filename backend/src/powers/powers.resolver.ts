import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { PowersService } from './powers.service';
import { Power } from './entities/power.entity';
import { CreatePowerInput, UpdatePowerInput } from './dto/inputs';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Power)
export class PowersResolver {
  constructor(
    private readonly powersService: PowersService,
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
}
