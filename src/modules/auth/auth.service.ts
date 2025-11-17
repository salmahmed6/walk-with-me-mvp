import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import * as bcrypt from "bcryptjs";
import { TokensUtil } from "../../common/utils/tokens.util";
import { LogoutDTO } from "./dto/logout.dto";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private tokensUtil: TokensUtil) {}

  async register(dto: RegisterDTO) {
    const exists = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { username: dto.username }] },
    });
    if (exists) throw new BadRequestException("Email or username already used");

    const hashed = await bcrypt.hash(dto.password, Number(process.env.BCRYPT_SALT_ROUNDS || 10));
    const user = await this.prisma.user.create({
      data: { email: dto.email, username: dto.username, password: hashed },
    });

    return { id: user.id, email: user.email, username: user.username, createdAt: user.createdAt };
  }

  async validateUser(email: string, plain: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) throw new UnauthorizedException("Invalid credentials");

    const matched = await bcrypt.compare(plain, user.password);
    if (!matched) throw new UnauthorizedException("Invalid credentials");

    return user;
  }

  async login(dto: LoginDTO) {
    const user = await this.validateUser(dto.email, dto.password);
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.tokensUtil.signAccessToken(payload);
    const refreshToken = this.tokensUtil.signRefreshToken({ sub: user.id });
    return { user, accessToken, refreshToken };
  }

  async logout(dto: LogoutDTO, userId: string): Promise<{ message: string }> {
    return { message: 'Logged out successfully. Please discard your tokens.' };
  }

  async oauthLogin(provider: string, profile: any) {
    const { email, username, providerId } = profile;
    if (!email) throw new BadRequestException('Email not provided by ' + provider);

    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          username: username || email.split('@')[0],
          password: '', // OAuth users don't have passwords
        },
      });
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.tokensUtil.signAccessToken(payload);
    const refreshToken = this.tokensUtil.signRefreshToken({ sub: user.id });

    return { user, accessToken, refreshToken };
  }

    // async oauthLogin(provider: "google" | "twitter", profile: any) {
    // let user = await this.prisma.user.findFirst({
    //     where:
    //     provider === "google"
    //         ? { googleId: profile.googleId }
    //         : { twitterId: profile.twitterId },
    // });

    // if (!user) {
    //     user = await this.prisma.user.create({
    //     data: {
    //         email: profile.email,
    //         username: profile.username || profile.email.split("@")[0],
    //         googleId: provider === "google" ? profile.googleId : undefined,
    //         twitterId: provider === "twitter" ? profile.twitterId : undefined,
    //     },
    //     });
    // }

    // const accessToken = this.tokensUtil.signAccessToken({ sub: user.id });
    // return { user, accessToken };
    // }


    async authTwitterLogin(provider: string, profile: any) {
  const { email, username, providerId: twitterId } = profile;

  if (!email) {
    throw new BadRequestException(`Email not provided by ${provider}`);
  }

  // Check if the user already exists by Twitter ID
  let user = await this.prisma.user.findUnique({ where: { email } });

  // If the user doesn't exist, create a new one
  if (!user) {
    user = await this.prisma.user.create({
      data: {
        email,
        username: username || email.split('@')[0],
        password: '', // OAuth users don't have passwords
        twitterId,   // store Twitter ID
      },
    });
  }

  // Generate access & refresh tokens
  const payload = { sub: user.id, email: user.email };
  const accessToken = this.tokensUtil.signAccessToken(payload);
  const refreshToken = this.tokensUtil.signRefreshToken({ sub: user.id });

  return { user, accessToken, refreshToken };
}

}