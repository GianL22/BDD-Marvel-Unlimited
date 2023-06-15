import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuscriptionService } from './suscription.service';
import { SuscriptionResolver } from './suscription.resolver';
import { Suscription } from './entities/suscription.entity';
import { MembershipsModule } from 'src/memberships/memberships.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [SuscriptionResolver, SuscriptionService],
  imports: [
    TypeOrmModule.forFeature( [Suscription] ),
    MembershipsModule,
    forwardRef( () => UsersModule),
  ],
  exports: [ SuscriptionService ]
})
export class SuscriptionModule {}
