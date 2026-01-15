import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

describe('AuthService', () => {
    let authService: AuthService;
    let userService: jest.Mocked<UserService>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: {
                        findOneByEmail: jest.fn(),
                        createUser: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('jwt-token'),
                    },
                },
            ],
        }).compile();

        authService = moduleRef.get(AuthService);
        userService = moduleRef.get(UserService);
    });

    it('should login existing user and return access token', async () => {
        userService.findOneByEmail.mockResolvedValue({
            id: '1',
            email: 'salma@test.com',
            password: '$2a$10$hashedpassword' // bcrypt hash
        } as any);

        // Mock bcrypt comparison
        jest.spyOn(require('bcryptjs'), 'compare').mockResolvedValue(true);

        const result = await authService.login({
            email: 'salma@test.com',
            password: 'password'
        });

        expect(result.accessToken).toBeDefined();
    });

    it('should throw error for invalid credentials', async () => {
        userService.findOneByEmail.mockResolvedValue(null);

        await expect(authService.login({
            email: 'salma@test.com',
            password: 'password'
        })).rejects.toThrow();
    });
});
