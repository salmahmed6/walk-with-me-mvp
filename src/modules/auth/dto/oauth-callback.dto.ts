export class OAuthCallbackDTO {
  provider!: 'google' | 'twitter';
  providerId!: string;
  email?: string;
  username?: string;
}