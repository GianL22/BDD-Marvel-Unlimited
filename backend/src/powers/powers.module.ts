import { Module } from '@nestjs/common';
import { PowersService } from './powers.service';
import { PowersResolver } from './powers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Power } from './entities/power.entity';

@Module({
  providers: [PowersResolver, PowersService],
  imports: [
    TypeOrmModule.forFeature([Power]),
  ],
  exports : [
    TypeOrmModule,
    PowersService,
  ]
})
export class PowersModule {}
