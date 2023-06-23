import { Module } from '@nestjs/common';
import { ReportsResolver } from './reports.resolver';
import { SuscriptionModule } from 'src/suscription/suscription.module';
import { UsePowersModule } from 'src/use-powers/use-powers.module';

@Module({
  providers: [ ReportsResolver ],
  imports : [
    SuscriptionModule,
    UsePowersModule,
  ]

})
export class ReportsModule {}
