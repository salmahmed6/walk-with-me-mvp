import { sign, verify } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import config from '../../config/jwt.config';

const conf = config();

@Injectable()
export class TokensUtil {
  signAccessToken(payload: object) {
    return sign(payload, conf.jwt.secret, { expiresIn: conf.jwt.expiresIn } as any);
  }

  signRefreshToken(payload: object) {
    return sign(payload, conf.jwt.secret, { expiresIn: conf.jwt.refreshExpiresIn } as any);
  }

  verifyToken<T = any>(token: string): T {
    return verify(token, conf.jwt.secret) as T;
  }
}