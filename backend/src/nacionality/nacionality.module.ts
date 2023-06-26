import { Module } from '@nestjs/common';
import { NacionalityService } from './nacionality.service';
import { NacionalityResolver } from './nacionality.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nacionality } from './entities/nacionality.entity';

@Module({
  providers: [NacionalityResolver, NacionalityService],
  imports: [
    TypeOrmModule.forFeature([
      Nacionality
    ]),
  ],
  exports:[
    NacionalityService,
    TypeOrmModule,
  ]
})
export class NacionalityModule {}
