import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersResolver } from './characters.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Civil, Hero, Villain, Character } from './entities';

@Module({
  providers: [CharactersResolver, CharactersService],
  imports: [
    TypeOrmModule.forFeature([
      Character,
      Hero,
      Civil,
      Villain
    ]),
  ],
  exports : [
    TypeOrmModule,
    CharactersService,
  ]
})
export class CharactersModule {}
