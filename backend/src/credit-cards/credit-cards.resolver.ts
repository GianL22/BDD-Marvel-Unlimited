import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CreditCardsService } from './credit-cards.service';
import { CreditCard } from './entities/credit-card.entity';
import { CreateCreditCardsInput } from './dto/inputs/create-credit-cards.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities';

@Resolver(() => CreditCard)
@UseGuards(JwtAuthGuard)
export class CreditCardsResolver {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Mutation(() => CreditCard, {name : 'createCreditCard'})
  async create (
    @Args('createCreditCardsInput') createCreditCardsInput: CreateCreditCardsInput,
  ) {
    return this.creditCardsService.create(createCreditCardsInput);
  }

  // @Query(() => CreditCard, { name: 'creditCard' })
  // async findOneByUser(
  //   @Args('cardNumber', { type: () => Int }) cardNumber: number,
  //   @CurrentUser() user : User
  // ) : Promise<CreditCard>{
  //   return this.creditCardsService.findOneByCardNumber(user);
  // }

  @ResolveField( () => Int, { name: 'last4Digits' })
  async last4DigitsByUser(
    @Parent() creditCard: CreditCard
  ): Promise<number> {
    return this.creditCardsService.getLast4Digits(creditCard.cardNumber);
  }
}
