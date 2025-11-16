import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokensUtil } from '../../common/utils/tokens.util';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, TokensUtil, GoogleStrategy]
})
export class AuthModule {}
