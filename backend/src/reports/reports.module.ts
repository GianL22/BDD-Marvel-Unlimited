import { Module } from '@nestjs/common';
import { ReportsResolver } from './reports.resolver';
import { ReportsService } from './reports.service';
import { UsersModule } from 'src/users/users.module';
import { MembershipsModule } from 'src/memberships/memberships.module';
import { SuscriptionModule } from 'src/suscription/suscription.module';

@Module({
  providers: [ReportsResolver, ReportsService],
  imports : [
    UsersModule,
    MembershipsModule,
    SuscriptionModule,
  ]

})
export class ReportsModule {}
