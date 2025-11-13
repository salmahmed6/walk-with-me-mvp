import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-twitter';
import oauthConfig from '../../../config/oauth.config';

const cfg = oauthConfig();

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor() {
    super({
      consumerKey: cfg.twitter.clientID,
      consumerSecret: cfg.twitter.clientSecret,
      callbackURL: cfg.twitter.callbackURL,
      includeEmail: true,
    });
  }

  async validate(token: string, tokenSecret: string, profile: any, done: Function) {
    const { id, username, emails } = profile;
    const user = {
      provider: 'twitter',
      providerId: id,
      email: emails?.[0]?.value,
      username,
    };
    done(null, user);
  }
}