import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async register(dto: RegisterDTO) {
    const existingUser = await this.userService.findOneByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userService.createUser({
      email: dto.email,
      name: dto.username,
      password: hashedPassword,
      provider: 'local',
    });

    return this.generateToken(user);
  }

  async login(dto: LoginDTO) {
    const user = await this.userService.findOneByEmail(dto.email);
    if (!user || !(user as any).password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, (user as any).password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  async oauthLogin(provider: string, profile: any) {
    let user = await this.userService.findOneByEmail(profile.emails[0].value);

    if (!user) {
      user = await this.userService.createUser({
        email: profile.emails[0].value,
        name: profile.displayName,
        picture: profile.photos[0]?.value,
        provider: provider,
      });
    }

    return this.generateToken(user);
  }

  async authTwitterLogin(provider: string, user: any) {
    return this.oauthLogin(provider, user);
  }

  async logout(userId: string) {
    return { success: true };
  }

  private generateToken(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
