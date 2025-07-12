import { Controller, Get, Post, Body, Patch, UseGuards, UploadedFile, UseInterceptors } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import type { UsersService } from "./users.service"
import type { UpdateUserDto } from "./dto/update-user.dto"
import type { Express } from "express"

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("profile")
  getProfile(req) {
    return this.usersService.findOne(req.user.userId)
  }

  @Patch("profile")
  @UseInterceptors(FileInterceptor("photo"))
  updateProfile(req, @Body() updateUserDto: UpdateUserDto, @UploadedFile() file?: Express.Multer.File) {
    return this.usersService.update(req.user.userId, updateUserDto, file)
  }

  @Post("emergency-contact")
  setEmergencyContact(req, @Body() emergencyContactDto: { phoneNumber: string }) {
    return this.usersService.setEmergencyContact(req.user.userId, emergencyContactDto.phoneNumber)
  }
}
