import { Resolver, Mutation, Args, Query, Float } from '@nestjs/graphql';
import { RatingsService } from './ratings.service';
import { Rating } from './entities/rating.entity';
import { RatingRelationInput } from './dto/inputs/rating-relarion.input';
import { Medio } from 'src/media/entities';

@Resolver(() => Rating)
export class RatingsResolver {
  constructor(
    private readonly ratingsService: RatingsService
  ) { }

  @Mutation(() => Boolean, { name: 'ratingMedio' })
  async toggleMedioInMyList(
    @Args('ratingRelationInput') ratingRelationInput: RatingRelationInput,
  ): Promise<Boolean> {
    return this.ratingsService.toggleRating(ratingRelationInput);
  }

  // @Query(()=> Rating, {name: 'topRatedMedia'})
  // async getTopRatedMedia(): Promise<any>{
  //   return await this.ratingsService.getTopRatedMedia();
  // }
}
