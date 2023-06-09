
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthService } from '../auth.service';
import { User } from '../../users/entities';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ){
    constructor(
        configService :ConfigService,
        private readonly authService: AuthService,
    ){
        super({
            secretOrKey: configService.get('JWT_SECRET'), //* Llave para firmar los tokens
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //* En donde vienen los tokens
        })
    }

    async validate(payload: JwtPayload): Promise<User>{
        
        const { id } = payload;
        const user = await this.authService.validateUser( id );

        return user; //*req.user
    }
}