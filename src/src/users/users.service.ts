import { Injectable } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { UpdateUserDto } from "./dto/update-user.dto"
import * as bcrypt from "bcrypt"
import type { Express } from "express"

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        photoUrl: true,
        emergencyContact: {
          select: {
            phoneNumber: true,
          },
        },
      },
    })
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto, file?: Express.Multer.File) {
    const updateData: any = { ...updateUserDto }

    if (file) {
      // Upload file to cloud storage and get URL
      updateData.photoUrl = await this.uploadPhoto(file)
    }

    if (updateUserDto.password) {
      updateData.passwordHash = await bcrypt.hash(updateUserDto.password, 10)
      delete updateData.password
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        photoUrl: true,
      },
    })
  }

  async setEmergencyContact(userId: number, phoneNumber: string) {
    return this.prisma.emergencyContact.upsert({
      where: { userId },
      update: { phoneNumber },
      create: { userId, phoneNumber },
    })
  }

  private async uploadPhoto(file: Express.Multer.File): Promise<string> {
    // Implement cloud storage upload logic
    // Return the uploaded file URL
    return "https://example.com/uploaded-photo.jpg"
  }
}
