import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUser } from '../user/interface/user.interface';
import { AuthService } from './auth.service';
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy,"jwt") {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "pfe",
    });
  }
  async validate(payload: any) {
    console.log("access token sta ",payload);
    return { email: payload.email,sub:payload.sub };
  }
}