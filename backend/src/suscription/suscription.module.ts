import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuscriptionService } from './suscription.service';
import { SuscriptionResolver } from './suscription.resolver';
import { Suscription } from './entities/suscription.entity';
import { MembershipsModule } from 'src/memberships/memberships.module';

@Module({
  providers: [SuscriptionResolver, SuscriptionService],
  imports: [
    TypeOrmModule.forFeature( [Suscription] ),
    MembershipsModule,
  ],
  exports: [
    TypeOrmModule,
    SuscriptionService
  ]
})
export class SuscriptionModule {}
