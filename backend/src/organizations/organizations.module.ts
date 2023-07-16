import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsResolver } from './organizations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { CharactersModule } from 'src/characters/characters.module';
import { PlacesModule } from 'src/places/places.module';
import { BuildingType } from './entities/building-type.entity';
import { Headquarter } from './entities/headquarter.entity';
import { JobPosition } from './entities/job-position.entity';
import { FormPart } from './entities/form-part.entity';

@Module({
  providers: [OrganizationsResolver, OrganizationsService],
  imports: [
    TypeOrmModule.forFeature([
      Organization,
      BuildingType,
      Headquarter,
      JobPosition,
      FormPart,
    ]),
    CharactersModule,
    PlacesModule
  ],
  exports: [
    OrganizationsService,
    TypeOrmModule,
  ]
})
export class OrganizationsModule { }
