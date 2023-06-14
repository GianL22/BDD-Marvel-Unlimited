import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { CountriesModule } from 'src/countries/countries.module';
import { SuscriptionModule } from 'src/suscription/suscription.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    CountriesModule,
    SuscriptionModule,
  ],
  exports:[
    TypeOrmModule,
    UsersService,
  ]
})
export class UsersModule {}