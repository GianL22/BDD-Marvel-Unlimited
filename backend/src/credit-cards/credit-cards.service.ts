import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditCard } from './entities/credit-card.entity';
import { CreateCreditCardInput } from './dto/inputs/create-credit-cards.input';

@Injectable()
export class CreditCardsService {
    constructor(
        @InjectRepository(CreditCard)
        private readonly creditCardsRepository: Repository<CreditCard>
    ) {}

    async createCreditCard(createCreditCardInput: CreateCreditCardInput): Promise<CreditCard> {
        try {
            const creditCard = await this.findOneByCardNumber(createCreditCardInput.cardNumber);
            if (creditCard)
                return creditCard;
            const newCreditCard = this.creditCardsRepository.create(createCreditCardInput);
            return await this.creditCardsRepository.save(newCreditCard);
        } catch (error) {
            throw new InternalServerErrorException('Error al crear la tarjeta');
        }
    }

    async findOneByCardNumber(cardNumber: string): Promise<CreditCard>{
       return await this.creditCardsRepository.findOneBy({ cardNumber });
    }

    // async getLast4Digits(cardNumber : number): Promise<number> {
    //     try {
    //         const creditCard = await this.creditCardsRepository.findOneByOrFail({ cardNumber });
    //         return creditCard.cardNumber % 10000;
    //     } catch (error) {
    //         throw new NotFoundException('No se encontro la tarjeta')
    //     }
    // }
}
