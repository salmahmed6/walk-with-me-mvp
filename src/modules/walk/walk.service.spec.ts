import { Test } from '@nestjs/testing';
import { WalkService } from './walk.service';
import { PrismaService } from '../../database/prisma.service';

describe('WalkService', () => {
    let service: WalkService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                WalkService,
                {
                    provide: PrismaService,
                    useValue: {
                        walk: {
                            create: jest.fn(),
                            findUnique: jest.fn(),
                            update: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();

        service = moduleRef.get(WalkService);
    });

    it('should create a walk session', async () => {
        const prisma = (service as any).prisma;
        prisma.walk.create.mockResolvedValue({ id: 'walk-1' });

        const walk = await service.createWalk({
            ownerId: 'user-1',
            durationMinutes: 30,
        });

        expect(walk).toBeDefined();
    });

    it('should accept join request', async () => {
        const prisma = (service as any).prisma;
        prisma.walk.update.mockResolvedValue({ status: 'ACTIVE' });

        const walk = await service.acceptJoin('walk-1', 'user-2');

        expect(walk.status).toBe('ACTIVE');
    });
});
