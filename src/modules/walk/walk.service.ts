import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class WalkService {
    constructor(private readonly prisma: PrismaService) { }

    createWalk(data: { ownerId: string; durationMinutes: number }) {
        return this.prisma.walk.create({
            data: {
                ownerId: data.ownerId,
                durationMinutes: data.durationMinutes,
                status: 'WAITING',
            },
        });
    }

    async requestJoin(walkId: string, userId: string) {
        const walk = await this.prisma.walk.findUnique({ where: { id: walkId } });

        if (!walk || walk.status !== 'WAITING') {
            throw new ForbiddenException('Walk not available');
        }

        return { walkId, userId };
    }

    async acceptJoin(walkId: string, userId: string) {
        return this.prisma.walk.update({
            where: { id: walkId },
            data: {
                participantId: userId,
                status: 'ACTIVE',
                startedAt: new Date(),
            },
        });
    }

    finishWalk(walkId: string) {
        return this.prisma.walk.update({
            where: { id: walkId },
            data: {
                status: 'FINISHED',
                endedAt: new Date(),
            },
        });
    }
}
