import { Module } from '@nestjs/common';
import { ReportsResolver } from './reports.resolver';
import { SuscriptionModule } from 'src/suscription/suscription.module';
import { MediaModule } from 'src/media/media.module';
import { PowersModule } from 'src/powers/powers.module';
import { RatingsModule } from 'src/ratings/ratings.module';
import { CharactersModule } from 'src/characters/characters.module';
import { OrganizationsModule } from 'src/organizations/organizations.module';

@Module({
  providers: [ ReportsResolver ],
  imports : [
    SuscriptionModule,
    MediaModule,
    PowersModule,
    RatingsModule,
    CharactersModule,
    OrganizationsModule,
  ]

})
export class ReportsModule {}
