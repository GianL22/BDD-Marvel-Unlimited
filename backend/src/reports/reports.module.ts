import { Module } from '@nestjs/common';
import { ReportsResolver } from './reports.resolver';
import { SuscriptionModule } from 'src/suscription/suscription.module';
import { MediaModule } from 'src/media/media.module';
import { PowersModule } from 'src/powers/powers.module';

@Module({
  providers: [ ReportsResolver ],
  imports : [
    SuscriptionModule,
    MediaModule
    PowersModule,
  ]

})
export class ReportsModule {}
