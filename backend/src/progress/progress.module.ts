import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressResolver } from './progress.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieProgress, SerieProgress, VideoGameProgress } from './entities';
import { MediaModule } from 'src/media/media.module';

@Module({
  providers: [ProgressResolver, ProgressService],
  imports: [
    TypeOrmModule.forFeature([MovieProgress, SerieProgress, VideoGameProgress]),
    MediaModule,
  ],
  exports: [
    TypeOrmModule,
    ProgressService,
  ]
})
export class ProgressModule { }
