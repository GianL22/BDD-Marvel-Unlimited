import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt';

import { AuthResponse } from './types/auth-response.type';
import { SignupInput } from './dto/inputs/signup.input';
import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/inputs/login.input';
import { User } from 'src/users/entities/user.entity';
import { CreateCreditCardInput } from 'src/credit-cards/dto/inputs/create-credit-cards.input';
import { CreditCardsService } from 'src/credit-cards/credit-cards.service';
import { CreateSuscriptionInput } from 'src/suscription/dto/inputs';
import { SuscriptionService } from 'src/suscription/suscription.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService :UsersService,
        private readonly jwtService: JwtService,
        private readonly creditCardService: CreditCardsService,
        private readonly suscriptionService: SuscriptionService,
    ){}

    private getJwtToken(userId: string){
        return this.jwtService.sign( {id: userId} );
    }
    
    async signup(
        signupInput: SignupInput, 
        createCreditCardInput: CreateCreditCardInput,
        createSuscriptionInput : CreateSuscriptionInput
    ): Promise<AuthResponse>{

        await this.creditCardService.createCreditCard( createCreditCardInput );
        
        const user = await this.usersService.create( signupInput, createCreditCardInput.cardNumber );

        await this.suscriptionService.createSuscription( createSuscriptionInput, user )
        
        const token = this.getJwtToken( user.id )

        return { user, token };
    }

    async login( loginInput :LoginInput): Promise<AuthResponse>{

        const {email, password} = loginInput;
        const user = await this.usersService.findOneByEmail( email );

        if(!user.isActive)
            throw new BadRequestException('El usario esta inhabilitado');

        if( !bcrypt.compareSync(password, user.password))
            throw new BadRequestException('Email/password do not match');

        const token = this.getJwtToken( user.id )

        return{
            token,
            user
        }
    }

    revalidateToken(user: User): AuthResponse{
        const token = this.getJwtToken( user.id );
        return{
            token,
            user,
        };
    }

    async validateUser( id: string): Promise<User>{
        
        const user = await this.usersService.findOneById( id );
        if( !user.isActive)
            throw new UnauthorizedException('User is inactive, talk with an admin');

        delete user.password;
        return user;
    }

}
