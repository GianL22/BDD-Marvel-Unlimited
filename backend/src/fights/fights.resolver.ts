import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FightsService } from './fights.service';
import { Fight } from './entities/fight.entity';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';
import { RemoveFightInput } from './dto/remove-fight.input';
import { FightResponse } from './types/fight-response.type';

@Resolver(() => Fight)
export class FightsResolver {
  constructor(private readonly fightsService: FightsService) {}

  @Mutation(() => [Fight], { name: 'createFight' })
  async createFight(@Args('createFightInput') createFightInput: CreateFightInput) {
    return this.fightsService.create(createFightInput);
  }

  @Query(() => [Fight], { name: 'fights' })
  findAll() {
    return this.fightsService.findAll();
  }

  @Query(() => FightResponse, { name: 'fightsByPlaceAndDate' })
  findAllByPlaceAndDate(@Args("placeId") placeId : string, @Args("date") date : string){
    return this.fightsService.findAllByPlaceAndDate( placeId, date );
  }

  // @Mutation(() => Fight)
  // updateFight(@Args('updateFightInput') updateFightInput: UpdateFightInput) {
  //   return this.fightsService.update(updateFightInput.id, updateFightInput);
  // }

  @Mutation(() => Boolean, { name: 'removeFight' })
  remove(@Args('removeFightInput') removeFightInput : RemoveFightInput) {
    return this.fightsService.remove(removeFightInput);
  }
}
