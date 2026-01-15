import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';

describe('Auth E2E', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it('/auth/login (POST)', async () => {
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'password123' })
            .expect(201);

        expect(res.body.accessToken).toBeDefined();
    });

    afterAll(async () => {
        await app.close();
    });
});
