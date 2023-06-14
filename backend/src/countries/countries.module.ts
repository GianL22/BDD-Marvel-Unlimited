import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesResolver } from './countries.resolver';
import { City, Country } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [CountriesResolver, CountriesService],
  imports: [
    TypeOrmModule.forFeature([Country, City]),
  ],
  exports : [
    TypeOrmModule,
    CountriesService,
  ]
})
export class CountriesModule {}
