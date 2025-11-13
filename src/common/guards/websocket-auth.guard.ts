import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import config from '../../config/jwt.config';

@Injectable()
export class WebsocketAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const token = client.handshake?.query?.token || client.handshake?.headers?.authorization?.split(' ')[1];
    if (!token) return false;
    try {
      const payload = verify(token, config().jwt.secret);
      client.user = payload;
      return true;
    } catch {
      return false;
    }
  }
}