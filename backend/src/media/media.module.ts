import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaResolver } from './media.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioVisualType, Medio, Movie, Serie, VideoGame } from './entities';
import { CompaniesModule } from 'src/companies/companies.module';
import { PersonsModule } from 'src/persons/persons.module';
import { Platform } from './entities/platform.entity';
import { Participates } from './entities/participates.entity';
import { Appears } from './entities/appears.entity';
import { RatingsModule } from 'src/ratings/ratings.module';

@Module({
  providers: [MediaResolver, MediaService],
  imports:[
    TypeOrmModule.forFeature([
      Serie,
      Medio,
      AudioVisualType,
      Movie,
      VideoGame,
      Platform,
      Participates,
      Appears
    ]),
    CompaniesModule,
    PersonsModule,
    RatingsModule,
  ],

  exports : [
    TypeOrmModule,
    MediaService
  ]

})
export class MediaModule {}
