import { Test } from '@nestjs/testing';
import { UserService } from './user.service';

import { PrismaService } from '../../database/prisma.service';

describe('UserService', () => {
    let userService: UserService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: PrismaService,
                    useValue: {
                        user: {
                            findUnique: jest.fn(),
                            create: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();

        userService = moduleRef.get(UserService);
    });



    it('should create user from firebase data', async () => {
        const prisma = (userService as any).prisma;
        prisma.user.create.mockResolvedValue({ id: '1' });

        const user = await userService.createUser({
            email: 'salma@test.com',
            name: 'Salma',
        });

        expect(user).toBeDefined();
    });
});
