import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly firebaseService: FirebaseService,
  ) { }

  async loginWithFirebase(firebaseToken: string) {
    const firebaseUser = await this.firebaseService.verifyToken(firebaseToken);

    let user = await this.userService.findByFirebaseUid(firebaseUser.uid);

    if (!user) {
      user = await this.userService.createUserFromFirebase(firebaseUser);
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return { accessToken };
  }
}
