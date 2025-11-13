import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import oauthConfig from '../../../config/oauth.config';

const cfg = oauthConfig();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: cfg.google.clientID,
      clientSecret: cfg.google.clientSecret,
      callbackURL: cfg.google.callbackURL,
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const { id, emails, displayName } = profile;
    const user = {
      provider: 'google',
      providerId: id,
      email: emails?.[0]?.value,
      username: displayName,
    };
    done(null, user);
  }
}