import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCardsService } from './credit-cards.service';
import { CreditCardsResolver } from './credit-cards.resolver';
import { CreditCard } from './entities/credit-card.entity';

@Module({
  providers: [CreditCardsResolver, CreditCardsService],
  imports : [
    TypeOrmModule.forFeature([CreditCard])
  ],
  exports : [CreditCardsService]
})
export class CreditCardsModule {}
