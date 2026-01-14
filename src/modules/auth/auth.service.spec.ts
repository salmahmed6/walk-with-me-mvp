import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

import { FirebaseService } from './firebase.service';

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
                        findByFirebaseUid: jest.fn(),
                        createUserFromFirebase: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('jwt-token'),
                    },
                },
                {
                    provide: FirebaseService,
                    useValue: {
                        verifyToken: jest.fn().mockResolvedValue({
                            uid: 'firebase-uid-123',
                            email: 'salma@test.com',
                        }),
                    },
                },
            ],
        }).compile();

        authService = moduleRef.get(AuthService);
        userService = moduleRef.get(UserService);
    });

    it('should login existing user and return JWT', async () => {
        userService.findByFirebaseUid.mockResolvedValue({
            id: '1',
            firebaseUid: 'firebase-uid-123',
            email: 'salma@test.com',
        } as any);

        const result = await authService.loginWithFirebase('fake-token');

        expect(result.accessToken).toBeDefined();
        expect(userService.createUserFromFirebase).not.toHaveBeenCalled();
    });

    it('should create user if not exists', async () => {
        userService.findByFirebaseUid.mockResolvedValue(null);
        userService.createUserFromFirebase.mockResolvedValue({
            id: '2',
            firebaseUid: 'firebase-uid-123',
        } as any);

        const result = await authService.loginWithFirebase('fake-token');

        expect(userService.createUserFromFirebase).toHaveBeenCalled();
        expect(result.accessToken).toBeDefined();
    });
});
