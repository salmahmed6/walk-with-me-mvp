import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from "./prisma/prisma.module"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { WalksModule } from "./walks/walks.module"
import { PostsModule } from "./posts/posts.module"
import { NotificationsModule } from "./notifications/notifications.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    WalksModule,
    PostsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
