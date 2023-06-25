import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsResolver } from './persons.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor, Creator, Director } from './entities';

@Module({
  providers: [PersonsResolver, PersonsService],
  imports: [
    TypeOrmModule.forFeature( [ Director, Actor, Creator ])
  ],
  exports:[
    TypeOrmModule,
    PersonsService,
  ]
})
export class PersonsModule {}
