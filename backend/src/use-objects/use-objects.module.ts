import { Module } from '@nestjs/common';
import { UseObjectsService } from './use-objects.service';
import { UseObjectsResolver } from './use-objects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UseObject } from './entities/use-object.entity';
import { CharactersModule } from 'src/characters/characters.module';

@Module({
  providers: [UseObjectsResolver, UseObjectsService],
  imports: [
    TypeOrmModule.forFeature([
      UseObject,
    ]),
    CharactersModule
  ],
  exports : [
    TypeOrmModule,
    UseObjectsService,
  ]
})
export class UseObjectsModule {}
