import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { RatingsService } from './ratings.service';
import { Rating } from './entities/rating.entity';
import { RatingRelationInput } from './dto/inputs/rating-relarion.input';

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
}
