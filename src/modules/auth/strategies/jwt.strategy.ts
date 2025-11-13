import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../../../config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config().jwt.secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}