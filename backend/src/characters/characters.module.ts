import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersResolver } from './characters.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Civil, Hero, Villain, Character } from './entities';
import { NacionalityModule } from 'src/nacionality/nacionality.module';
import { ObjectsModule } from 'src/objects/objects.module';
import { ColorsModule } from 'src/colors/colors.module';
import { OccupationsModule } from 'src/occupations/occupations.module';
import { PersonsModule } from 'src/persons/persons.module';

@Module({
  providers: [CharactersResolver, CharactersService],
  imports: [
    TypeOrmModule.forFeature([
      Character,
      Hero,
      Civil,
      Villain
    ]),
    NacionalityModule,
    ObjectsModule,
    ColorsModule,
    OccupationsModule,
    PersonsModule
  ],
  exports : [
    TypeOrmModule,
    CharactersService,
  ]
})
export class CharactersModule {}
