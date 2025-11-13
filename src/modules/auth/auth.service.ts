import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import * as bcrypt from "bcryptjs";
import { TokensUtil } from "../../common/utils/tokens.util";

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
}