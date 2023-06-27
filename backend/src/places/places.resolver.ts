import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PlacesService } from './places.service';
import { Place } from './entities/place.entity';

@Resolver()
export class PlacesResolver {
  constructor(private readonly placesService: PlacesService) {}

  @Mutation(() => Place, { name: 'createPlace' })
  async createPlace( @Args('name') placeName : string) : Promise<Place>{
    return this.placesService.createPlace( placeName );
  }


  @Query(() => [Place], {name : 'places'})
  async findAllPlaces() : Promise<Place[]>{
    return this.placesService.findAllPlaces();
  }


}
