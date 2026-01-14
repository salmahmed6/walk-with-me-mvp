import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    findByFirebaseUid(firebaseUid: string) {
        return this.prisma.user.findUnique({
            where: { firebaseUid },
        });
    }

    createUserFromFirebase(data: {
        uid: string;
        email: string;
        name?: string;
        picture?: string;
        provider?: string;
    }) {
        return this.prisma.user.create({
            data: {
                firebaseUid: data.uid,
                email: data.email,
                name: data.name,
                avatarUrl: data.picture,
                provider: data.provider,
            },
        });
    }
}
