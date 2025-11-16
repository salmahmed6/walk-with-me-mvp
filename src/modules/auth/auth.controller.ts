import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { GoogleAuthGuard } from '../../common/guards/google-auth.guard';
import { LoginDTO } from './dto/login.dto';
import { LogoutDTO } from './dto/logout.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body() dto: RegisterDTO) {
		return this.authService.register(dto);
	}

	@Post('login')
	async login(@Body() dto: LoginDTO) {
		return this.authService.login(dto);
	}

	@Post('logout')
	async logout(@Body() dto: LogoutDTO, @Req() req: any) {
		const userId = String(req?.user?.id);
		return this.authService.logout(dto, userId);
	}

	@Get('google')
	@UseGuards(GoogleAuthGuard)
	async googleAuth() {}

	@Get('google/callback')
	@UseGuards(GoogleAuthGuard)
	async googleAuthCallback(@Req() req: Request) {
		// req.user comes from GoogleStrategy.validate()
		return this.authService.oauthLogin('google', req.user);
	}
}
