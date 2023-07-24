import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchService } from './search.service';
import { Medio } from 'src/media/entities';

@Resolver(()=> Medio)
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(()=> [Medio], {name: 'search'})
  async getSearchResult(@Args('toSearch') toSearch : string): Promise<Medio[]>{
    return await this.searchService.getSearchResults(toSearch);
  }


}
