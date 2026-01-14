export const firebaseAdminMock = {
    auth: () => ({
        verifyIdToken: jest.fn().mockResolvedValue({
            uid: 'firebase-uid-123',
            email: 'salma@test.com',
            name: 'Salma Ahmed',
            picture: 'https://photo.url/avatar.png',
            provider: 'google',
        }),
    }),
};
