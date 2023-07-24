import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchResolver } from './search.resolver';
import { MediaModule } from 'src/media/media.module';

@Module({
  providers: [SearchResolver, SearchService],
  imports : [

    MediaModule

  ]
})
export class SearchModule {}
