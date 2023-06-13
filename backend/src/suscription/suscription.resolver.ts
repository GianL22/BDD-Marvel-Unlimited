import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SuscriptionService } from './suscription.service';
import { Suscription } from './entities/suscription.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateSuscriptionInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities';

@Resolver(() => Suscription)
@UseGuards(JwtAuthGuard)
export class SuscriptionResolver {
  constructor(private readonly suscriptionService: SuscriptionService) {}

  @Mutation(() => Suscription, { name: 'createSuscription' })
  async createSuscription(
    @CurrentUser() user : User, 
    @Args('createSuscriptionInput') createSuscriptionInput: CreateSuscriptionInput,
  ) : Promise<Suscription> {
    return await this.suscriptionService.createSuscription(createSuscriptionInput, user);
  }

  @Query(() => [Suscription], { name: 'reportSuscriptions' })
  async reportSuscriptions() : Promise<Suscription[]> {
    return await this.suscriptionService.reportSuscriptions();
  }

  @Mutation(() => Suscription, { name: 'changeSuscription' })
  async changeSuscription(
    @CurrentUser() user : User, 
    @Args('createSuscriptionInput') createSuscriptionInput: CreateSuscriptionInput,
  ) : Promise<Suscription> {
    return await this.suscriptionService.changeSuscription(createSuscriptionInput, user);
  }

  @Query(() => Suscription, { name: 'suscriptionByUser' })
  async findOneActiveByUser(@CurrentUser() user: User) : Promise<Suscription> {
    return await this.suscriptionService.findOneActiveByUser(user);
  }

}
