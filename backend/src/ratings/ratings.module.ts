import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsResolver } from './ratings.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';

@Module({
  providers: [RatingsResolver, RatingsService],
  imports:[
    TypeOrmModule.forFeature([Rating]),
  ],
  exports:[
    TypeOrmModule,
    RatingsService,
  ]
})
export class RatingsModule {}
