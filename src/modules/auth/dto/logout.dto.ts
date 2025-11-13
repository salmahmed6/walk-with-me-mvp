import { IsOptional, IsString } from 'class-validator';

export class LogoutDTO {
  @IsOptional()
  @IsString()
  refreshToken?: string; // If using refresh token rotation

  @IsOptional()
  @IsString()
  deviceId?: string; // For multi-device logout

  @IsOptional()
  @IsString()
  logoutFromAllDevices?: boolean; // For logging out from all sessions
}