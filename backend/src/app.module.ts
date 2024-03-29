import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MembershipsModule } from './memberships/memberships.module';
import { CreditCardsModule } from './credit-cards/credit-cards.module';
import { SuscriptionModule } from './suscription/suscription.module';
import { CountriesModule } from './countries/countries.module';
import { ColorsModule } from './colors/colors.module';
import { CharactersModule } from './characters/characters.module';
import { ReportsModule } from './reports/reports.module';
import { PowersModule } from './powers/powers.module';
import { ObjectsModule } from './objects/objects.module';
import { NacionalityModule } from './nacionality/nacionality.module';
import { OccupationsModule } from './occupations/occupations.module';
import { PersonsModule } from './persons/persons.module';
import { CompaniesModule } from './companies/companies.module';
import { MediaModule } from './media/media.module';
import { FilesModule } from './files/files.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { PlacesModule } from './places/places.module';
import { FightsModule } from './fights/fights.module';
import { RatingsModule } from './ratings/ratings.module';
import { ProgressModule } from './progress/progress.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: false,
      playground: false,
      autoSchemaFile: join( process.cwd(), 'src/schema.gql'),
      plugins: [
        ApolloServerPluginLandingPageLocalDefault(),
        ]
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),

    UsersModule,

    AuthModule,

    MembershipsModule,

    CreditCardsModule,

    SuscriptionModule,

    CountriesModule,

    ColorsModule,

    CharactersModule,

    ReportsModule,

    PowersModule,

    ObjectsModule,

    NacionalityModule,

    OccupationsModule,

    PersonsModule,

    CompaniesModule,

    MediaModule,

    FilesModule,
    
    OrganizationsModule,

    PlacesModule,

    FightsModule,

    RatingsModule,

    ProgressModule,

    SearchModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
