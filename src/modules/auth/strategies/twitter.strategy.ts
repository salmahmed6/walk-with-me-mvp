import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-twitter-oauth2';
import oauthConfig from '../../../config/oauth.config';

const cfg = oauthConfig();

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor() {
    super({
        clientID: cfg.twitter.clientID,
        clientSecret: cfg.twitter.clientSecret,
        callbackURL: cfg.twitter.callbackURL,
        scope: ['tweet.read', 'users.read', 'offline.access'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { id, username, emails } = profile;
    return {
      provider: 'twitter',
      providerId: id,
      email: emails?.[0]?.value,
      username,
    };
  }
}
