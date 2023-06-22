import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsResolver } from './colors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';

@Module({
  providers: [ColorsResolver, ColorsService],
  imports: [
    TypeOrmModule.forFeature([Color]),
  ],
  exports : [
    TypeOrmModule,
    ColorsService,
  ]
})
export class ColorsModule {}
