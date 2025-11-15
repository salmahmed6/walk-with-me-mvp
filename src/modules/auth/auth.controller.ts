import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
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
}
