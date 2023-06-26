import { Module } from '@nestjs/common';
import { ReportsResolver } from './reports.resolver';
import { UsersModule } from 'src/users/users.module';
import { MembershipsModule } from 'src/memberships/memberships.module';
import { SuscriptionModule } from 'src/suscription/suscription.module';
import { MediaModule } from 'src/media/media.module';

@Module({
  providers: [ ReportsResolver ],
  imports : [
    SuscriptionModule,
    MediaModule
  ]

})
export class ReportsModule {}
