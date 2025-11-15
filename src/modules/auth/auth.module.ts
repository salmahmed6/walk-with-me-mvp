import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokensUtil } from '../../common/utils/tokens.util';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokensUtil]
})
export class AuthModule {}
