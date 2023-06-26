import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaResolver } from './media.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioVisualType, Medio, Movie, Serie, VideoGame } from './entities';
import { CompaniesModule } from 'src/companies/companies.module';
import { PersonsModule } from 'src/persons/persons.module';

@Module({
  providers: [MediaResolver, MediaService],
  imports:[
    TypeOrmModule.forFeature([
      Serie, Medio, AudioVisualType, Movie, VideoGame
    ]),
    CompaniesModule,
    PersonsModule
  ],

  exports : [
    MediaService
  ]

})
export class MediaModule {}
