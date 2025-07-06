import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request, Query } from "@nestjs/common"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import type { WalksService } from "./walks.service"
import type { CreateWalkDto } from "./dto/create-walk.dto"
import type { CreateInvitationDto } from "./dto/create-invitation.dto"
import type { StartWalkSessionDto } from "./dto/start-walk-session.dto"
import type { UpdateWalkSessionDto } from "./dto/update-walk-session.dto"

@Controller("walks")
@UseGuards(JwtAuthGuard)
export class WalksController {
  constructor(private readonly walksService: WalksService) {}

  @Post()
  create(@Body() createWalkDto: CreateWalkDto, @Request() req) {
    return this.walksService.create(req.user.userId, createWalkDto)
  }

  @Get()
  findAll(@Query('status') status?: string, @Request() req) {
    return this.walksService.findUserWalks(req.user.userId, status)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walksService.findOne(+id);
  }

  @Post(":id/invite")
  sendInvitation(@Param('id') walkId: string, @Body() invitationDto: CreateInvitationDto, @Request() req) {
    return this.walksService.sendInvitation(req.user.userId, +walkId, invitationDto.recipientId)
  }

  @Patch("invitations/:id/accept")
  acceptInvitation(@Param('id') invitationId: string, @Request() req) {
    return this.walksService.acceptInvitation(req.user.userId, +invitationId)
  }

  @Post(":id/start-session")
  startWalkSession(@Param('id') walkId: string, @Body() startSessionDto: StartWalkSessionDto, @Request() req) {
    return this.walksService.startWalkSession(req.user.userId, +walkId, startSessionDto)
  }

  @Patch("sessions/:id")
  updateWalkSession(@Param('id') sessionId: string, @Body() updateSessionDto: UpdateWalkSessionDto, @Request() req) {
    return this.walksService.updateWalkSession(+sessionId, updateSessionDto)
  }

  @Post("sessions/:id/finish")
  finishWalkSession(@Param('id') sessionId: string, @Request() req) {
    return this.walksService.finishWalkSession(+sessionId)
  }
}
