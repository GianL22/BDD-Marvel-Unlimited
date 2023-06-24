import { Module } from '@nestjs/common';
import { OccupationsService } from './occupations.service';
import { OccupationsResolver } from './occupations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Occupation } from './entities/occupation.entity';

@Module({
  providers: [OccupationsResolver, OccupationsService],
  imports: [
    TypeOrmModule.forFeature([
      Occupation,
    ]),
  ],
  exports:[
    OccupationsService,
    TypeOrmModule,
  ]
})
export class OccupationsModule {}
