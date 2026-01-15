import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { WalkModule } from './modules/walk/walk.module';

@Module({
  imports: [AuthModule, WalkModule],
})
export class AppModule { }

