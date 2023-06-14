import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';
import { City } from './entities';

@Resolver(() => Country)
export class CountriesResolver {
  constructor(private readonly countriesService: CountriesService) {}

  @Query(() => [Country], { name: 'countries' })
  async findAllCountries(): Promise<Country[]> {
    return this.countriesService.findAllCountries();
  }

  @ResolveField(()=> [City], {name: 'cities'})
  async findAllCitiesByCountry(
    @Parent() country: Country
  ): Promise<City[]>{
    return this.countriesService.findAllCitiesByCountry(country.description)
  }

}
