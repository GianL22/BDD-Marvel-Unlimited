import { Module } from '@nestjs/common';
import { ObjectsService } from './objects.service';
import { ObjectsResolver } from './objects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Objects, ObjectsType } from './entities';

@Module({
  providers: [ObjectsResolver, ObjectsService],
  imports: [
    TypeOrmModule.forFeature([
      Objects,
      ObjectsType,
    ]),
  ],
  exports : [
    TypeOrmModule,
    ObjectsService,
  ]
})
export class ObjectsModule {}
