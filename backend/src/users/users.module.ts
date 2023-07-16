import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { CountriesModule } from 'src/countries/countries.module';
import { SuscriptionModule } from 'src/suscription/suscription.module';
import { MyList, PreferenceList, Profile, User } from './entities';
import { MediaModule } from 'src/media/media.module';
import { RatingsModule } from 'src/ratings/ratings.module';
import { ProgressModule } from 'src/progress/progress.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Profile, MyList, PreferenceList]),
    CountriesModule,
    SuscriptionModule,
    MediaModule,
    RatingsModule,
    ProgressModule
  ],
  exports: [
    TypeOrmModule,
    UsersService,
  ]
})
export class UsersModule { }