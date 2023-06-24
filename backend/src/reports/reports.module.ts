import { Module } from '@nestjs/common';
import { ReportsResolver } from './reports.resolver';
import { SuscriptionModule } from 'src/suscription/suscription.module';
import { PowersModule } from 'src/powers/powers.module';

@Module({
  providers: [ ReportsResolver ],
  imports : [
    SuscriptionModule,
    PowersModule,
  ]

})
export class ReportsModule {}
