import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesResolver } from './places.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { Organization } from 'src/organizations/entities/organization.entity';

@Module({
  providers: [PlacesResolver, PlacesService],
  imports: [
    TypeOrmModule.forFeature([Place, Organization])
  ],
  exports: [
    PlacesService
  ]


})
export class PlacesModule {}
