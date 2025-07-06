import { Injectable, UnauthorizedException } from "@nestjs/common"
import type { JwtService } from "@nestjs/jwt"
import type { ConfigService } from "@nestjs/config"
import type { PrismaService } from "../prisma/prisma.service"
import * as bcrypt from "bcrypt"
import type { CreateUserDto } from "./dto/create-user.dto"
import type { LoginDto } from "./dto/login.dto"

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new UnauthorizedException("User with this email already exists")
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        username,
      },
      select: {
        id: true,
        email: true,
        username: true,
        photoUrl: true,
        createdAt: true,
      },
    })

    // Generate JWT token
    const payload = { userId: user.id, email: user.email }
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>("jwt.secret"),
      expiresIn: this.configService.get<string>("jwt.expiresIn"),
    })

    return {
      user,
      token,
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new UnauthorizedException("Invalid credentials")
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials")
    }

    // Generate JWT token
    const payload = { userId: user.id, email: user.email }
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>("jwt.secret"),
      expiresIn: this.configService.get<string>("jwt.expiresIn"),
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        photoUrl: user.photoUrl,
        createdAt: user.createdAt,
      },
      token,
    }
  }

  async validateUser(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        photoUrl: true,
      },
    })
  }
}
