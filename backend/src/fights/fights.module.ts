import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FightsService } from './fights.service';
import { FightsResolver } from './fights.resolver';
import { Fight } from './entities/fight.entity';
import { PowersModule } from 'src/powers/powers.module';
import { ObjectsModule } from 'src/objects/objects.module';
import { PlacesModule } from 'src/places/places.module';
import { CharactersModule } from 'src/characters/characters.module';

@Module({
  providers: [FightsResolver, FightsService],
  imports: [ 
    TypeOrmModule.forFeature([Fight]),
    PowersModule,
    ObjectsModule,
    PlacesModule,
    CharactersModule
  ],
  exports : [
    FightsService
  ]
})
export class FightsModule {}
