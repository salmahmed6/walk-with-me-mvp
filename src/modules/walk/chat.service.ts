import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ChatService {
    constructor(private readonly prisma: PrismaService) { }

    async sendMessage(walkId: string, senderId: string, content: string) {
        const walk = await this.prisma.walk.findUnique({ where: { id: walkId } });

        if (!walk || walk.status !== 'ACTIVE') {
            throw new ForbiddenException('Chat not allowed');
        }

        if (![walk.ownerId, walk.participantId].includes(senderId)) {
            throw new ForbiddenException('Not a participant');
        }

        return this.prisma.walkMessage.create({
            data: { walkId, senderId, content },
        });
    }

    getMessages(walkId: string) {
        return this.prisma.walkMessage.findMany({
            where: { walkId },
            orderBy: { createdAt: 'asc' },
        });
    }
}
