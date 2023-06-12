import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditCard } from './entities/credit-card.entity';
import { CreateCreditCardsInput } from './dto/inputs/create-credit-cards.input';
import { User } from 'src/users/entities';

@Injectable()
export class CreditCardsService {
    constructor(
        @InjectRepository(CreditCard)
        private readonly creditCardsRepository: Repository<CreditCard>
    ) {}

    async create(createCreditCardsInput: CreateCreditCardsInput): Promise<CreditCard> {
        try {
            const newCreditCard = this.creditCardsRepository.create(createCreditCardsInput);
            return await this.creditCardsRepository.save(newCreditCard);
        } catch (error) {
            throw new InternalServerErrorException('Error al crear la tarjeta');
        }
    }

    // async findOneByCardNumber(user : User){
    //     const creditCard = await this.creditCardsRepository.findOneBy({ cardNumber });
    //     return creditCard;
    // }

    

    async getLast4Digits(cardNumber : number): Promise<number> {
        try {
            const creditCard = await this.creditCardsRepository.findOneByOrFail({ cardNumber });
            return creditCard.cardNumber % 10000;
        } catch (error) {
            throw new NotFoundException('No se encontro la tarjeta')
        }
    }
}
