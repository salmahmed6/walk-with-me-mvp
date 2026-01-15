import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';

describe('Walk E2E', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it('/walk (POST)', async () => {
        const res = await request(app.getHttpServer())
            .post('/walk')
            .send({ durationMinutes: 20 })
            .expect(201);

        expect(res.body.id).toBeDefined();
    });

    afterAll(async () => {
        await app.close();
    });
});
