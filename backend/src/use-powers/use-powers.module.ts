import { Module } from '@nestjs/common';
import { UsePowersService } from './use-powers.service';
import { UsePowersResolver } from './use-powers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsePower } from './entities/use-power.entity';
import { CharactersModule } from 'src/characters/characters.module';

@Module({
  providers: [UsePowersResolver, UsePowersService],
  imports: [
    TypeOrmModule.forFeature([UsePower]),
    CharactersModule,
  ],
})
export class UsePowersModule {}
