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

//    /**
//    * Invalidate a specific refresh token
//    * In production, you would add it to a blacklist or delete from database
//    */
//   async invalidateRefreshToken(refreshToken: string): Promise<boolean> {
//     try {
//       // Option 1: Add to blacklist (in-memory or Redis)
//       // await this.redisService.set(`blacklist:${refreshToken}`, 'true', 'EX', this.getTokenExpiry(refreshToken));
      
//       // Option 2: Delete from database (if storing refresh tokens)
//       // await this.tokenRepository.delete({ token: refreshToken });
      
//       // Option 3: For JWT without storage, you can't truly invalidate until expiry
//       // But you can verify the token first to ensure it's valid before "invalidating"
//       const decoded = this.verifyToken(refreshToken);
      
//       // For demo purposes, we'll just return success
//       console.log(`Refresh token invalidated for user: ${(decoded as any).sub}`);
//       return true;
//     } catch (error) {
//       console.error('Error invalidating refresh token:', error);
//       return false;
//     }
//   }

//   async deleteDeviceTokens(userId: string, deviceId: string): Promise<boolean> {
//     try {
//       // In production, you would delete from database
//       // await this.tokenRepository.delete({ userId, deviceId });
      
//       // For demo purposes
//       console.log(`All tokens deleted for user ${userId}, device ${deviceId}`);
//       return true;
//     } catch (error) {
//       console.error('Error deleting device tokens:', error);
//       return false;
//     }
//   }

//   async deleteAllRefreshTokens(userId: string): Promise<boolean> {
//     try {
//       // In production, you would delete all user tokens from database
//       // await this.tokenRepository.delete({ userId });
      
//       // For demo purposes
//       console.log(`All refresh tokens deleted for user: ${userId}`);
//       return true;
//     } catch (error) {
//       console.error('Error deleting all refresh tokens:', error);
//       return false;
//     }
//   }
}