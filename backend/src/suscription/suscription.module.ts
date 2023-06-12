import { Module } from '@nestjs/common';
import { SuscriptionService } from './suscription.service';
import { SuscriptionResolver } from './suscription.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suscription } from './entities/suscription.entity';

@Module({
  providers: [SuscriptionResolver, SuscriptionService],
  imports: [
    TypeOrmModule.forFeature( [Suscription] )
  ]
})
export class SuscriptionModule {}
