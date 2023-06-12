import { Module } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { MembershipsResolver } from './memberships.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';

@Module({
  providers: [MembershipsResolver, MembershipsService],
  imports : [
      TypeOrmModule.forFeature([ Membership ]),
  ]
})
export class MembershipsModule {}
