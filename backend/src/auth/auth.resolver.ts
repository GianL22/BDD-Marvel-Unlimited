import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthResponse } from './types/auth-response.type';
import { LoginInput,SignupInput } from './dto/inputs';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthService } from './auth.service';
import { CreateCreditCardInput } from '../credit-cards/dto/inputs/create-credit-cards.input';
import { CreateSuscriptionInput } from 'src/suscription/dto/inputs';


@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Mutation( () => AuthResponse, {name: 'signup'})
  async signup(
    @Args('signupInput') signupInput :SignupInput,
    @Args('creditCardInput') creditCardInput: CreateCreditCardInput,
    @Args('suscriptionInput') suscriptionInput: CreateSuscriptionInput,
  ): Promise<AuthResponse>{
    return this.authService.signup( signupInput, creditCardInput, suscriptionInput );
  }

  @Mutation(() => AuthResponse , {name: 'login'})
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthResponse>{
    return this.authService.login( loginInput );
  }

  @Query( () => AuthResponse , {name: 'revalite'})
  @UseGuards( JwtAuthGuard ) //* Solicito un JWT
  revalidateToken(
    @CurrentUser() user: User,
  ): AuthResponse {
    return this.authService.revalidateToken( user );
  }
}
