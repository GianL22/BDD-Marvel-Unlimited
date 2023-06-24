import { Module } from '@nestjs/common';
import { PowersService } from './powers.service';
import { PowersResolver } from './powers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsePower, Power } from './entities';
import { CharactersModule } from 'src/characters/characters.module';

@Module({
  providers: [PowersResolver, PowersService],
  imports: [
    TypeOrmModule.forFeature([Power, UsePower]),
    CharactersModule,
  ],
  exports : [
    TypeOrmModule,
    PowersService,
  ]
})
export class PowersModule {}
