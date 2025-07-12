import { Injectable } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { NotificationsService } from "../notifications/notifications.service"
import type { CreateWalkDto } from "./dto/create-walk.dto"
import type { StartWalkSessionDto } from "./dto/start-walk-session.dto"
import type { UpdateWalkSessionDto } from "./dto/update-walk-session.dto"

@Injectable()
export class WalksService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async create(organizerId: number, createWalkDto: CreateWalkDto) {
    return this.prisma.walkEvent.create({
      data: {
        organizerId,
        ...createWalkDto,
        dateTime: new Date(createWalkDto.dateTime),
      },
      include: {
        organizer: {
          select: { id: true, username: true, photoUrl: true },
        },
      },
    })
  }

  async findUserWalks(userId: number, status?: string) {
    const where: any = {
      OR: [
        { organizerId: userId },
        {
          invitations: {
            some: {
              recipientId: userId,
              status: "accepted",
            },
          },
        },
      ],
    }

    if (status) {
      where.status = status
    }

    return this.prisma.walkEvent.findMany({
      where,
      include: {
        organizer: {
          select: { id: true, username: true, photoUrl: true },
        },
        participants: {
          select: { id: true, username: true, photoUrl: true },
        },
        _count: {
          select: { participants: true },
        },
      },
      orderBy: { dateTime: "asc" },
    })
  }

  async findOne(id: number) {
    return this.prisma.walkEvent.findUnique({
      where: { id },
      include: {
        organizer: {
          select: { id: true, username: true, photoUrl: true },
        },
        participants: {
          select: { id: true, username: true, photoUrl: true },
        },
        invitations: {
          include: {
            recipient: {
              select: { id: true, username: true, photoUrl: true },
            },
          },
        },
      },
    })
  }

  async sendInvitation(senderId: number, walkId: number, recipientId: number) {
    const invitation = await this.prisma.invitation.create({
      data: {
        senderId,
        walkId,
        recipientId,
        status: "pending",
      },
      include: {
        sender: { select: { username: true } },
        walk: { select: { location: true, dateTime: true } },
      },
    })

    // Send push notification
    await this.notificationsService.sendWalkInvitation(
      recipientId,
      invitation.sender.username,
      invitation.walk.location,
    )

    return invitation
  }

  async acceptInvitation(userId: number, invitationId: number) {
    const invitation = await this.prisma.invitation.findFirst({
      where: {
        id: invitationId,
        recipientId: userId,
        status: "pending",
      },
    })

    if (!invitation) {
      throw new Error("Invitation not found or already processed")
    }

    // Update invitation status and add user to walk participants
    const [updatedInvitation] = await this.prisma.$transaction([
      this.prisma.invitation.update({
        where: { id: invitationId },
        data: { status: "accepted" },
      }),
      this.prisma.walkEvent.update({
        where: { id: invitation.walkId },
        data: {
          participants: {
            connect: { id: userId },
          },
        },
      }),
    ])

    return updatedInvitation
  }

  async startWalkSession(userId: number, walkId: number, startSessionDto: StartWalkSessionDto) {
    return this.prisma.walkSession.create({
      data: {
        userId,
        walkId,
        startTime: new Date(),
        startLatitude: startSessionDto.latitude,
        startLongitude: startSessionDto.longitude,
        gpsPoints: [],
      },
    })
  }

  async updateWalkSession(sessionId: number, updateSessionDto: UpdateWalkSessionDto) {
    const session = await this.prisma.walkSession.findUnique({
      where: { id: sessionId },
    })

    if (!session) {
      throw new Error("Walk session not found")
    }

    const updatedGpsPoints = [
      ...session.gpsPoints,
      {
        latitude: updateSessionDto.latitude,
        longitude: updateSessionDto.longitude,
        timestamp: new Date().toISOString(),
      },
    ]

    // Calculate distance (simplified - in production, use proper geolocation calculations)
    const distance = this.calculateDistance(updatedGpsPoints)

    return this.prisma.walkSession.update({
      where: { id: sessionId },
      data: {
        gpsPoints: updatedGpsPoints,
        distance,
      },
    })
  }

  async finishWalkSession(sessionId: number) {
    const session = await this.prisma.walkSession.findUnique({
      where: { id: sessionId },
    })

    if (!session) {
      throw new Error("Walk session not found")
    }

    const endTime = new Date()
    const duration = Math.floor((endTime.getTime() - session.startTime.getTime()) / 1000) // Duration in seconds

    return this.prisma.walkSession.update({
      where: { id: sessionId },
      data: {
        endTime,
        duration,
      },
    })
  }

  private calculateDistance(gpsPoints: any[]): number {
    // Simplified distance calculation
    // In production, use proper haversine formula
    if (gpsPoints.length < 2) return 0

    let totalDistance = 0
    for (let i = 1; i < gpsPoints.length; i++) {
      const prev = gpsPoints[i - 1]
      const curr = gpsPoints[i]

      // Simplified distance calculation (should use haversine formula)
      const latDiff = curr.latitude - prev.latitude
      const lonDiff = curr.longitude - prev.longitude
      const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff) * 111000 // Rough conversion to meters

      totalDistance += distance
    }

    return Math.round(totalDistance)
  }
}
