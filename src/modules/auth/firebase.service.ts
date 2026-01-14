import { Injectable } from '@nestjs/common';
import { firebaseAdminMock } from './firebase.mock';

@Injectable()
export class FirebaseService {
    async verifyToken(token: string) {
        return firebaseAdminMock.auth().verifyIdToken(token);
    }
}
